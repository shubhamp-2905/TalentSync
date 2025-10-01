// app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Otp from '@/models/Otp';
import nodemailer from 'nodemailer';
import ResumeParser from 'resume-parser';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// CRITICAL FIX: Disable Next.js Body Parser for File Uploads
// This tells Next.js not to try to parse the request body, 
// allowing the manual request.formData() to work correctly for large files.
export const config = {
    api: {
        bodyParser: false,
    },
};

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    secure: parseInt(process.env.EMAIL_SERVER_PORT || "587") === 465,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

async function parseFormData(request: Request) {
    const formData = await request.formData();
    const fields: { [key: string]: string } = {};
    let file: File | null = null;
    
    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            file = value;
        } else {
            fields[key] = value as string; // Explicitly cast to string for safety
        }
    }
    return { fields, file };
}

export async function POST(request: Request) {
    await dbConnect();
    
    try {
        const { fields, file } = await parseFormData(request);
        const { email, password, role, ...userData } = fields;

        if (!email || !password) {
            // Added check for password string length (good practice)
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }
        
        const existingVerifiedUser = await User.findOne({ email, isVerified: true });
        if (existingVerifiedUser) {
            return NextResponse.json({ message: 'User with this email already exists and is verified.' }, { status: 409 });
        }

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, password, role, ...userData, isVerified: false });
        } else {
            // Update existing unverified user
            user.set({ password, role, ...userData, isVerified: false });
        }

        if (file && role === 'student') {
            const tempDir = os.tmpdir();
            // Using a unique file name to avoid collisions, though unlikely on serverless
            const tempFileName = `${Date.now()}-${file.name}`;
            const tempFilePath = path.join(tempDir, tempFileName);
            
            // Read the file buffer and write to the temporary file system
            await fs.writeFile(tempFilePath, Buffer.from(await file.arrayBuffer()));
            
            try {
                // Ensure the resume-parser is configured for the correct file type
                const parsedData = await ResumeParser.parseResumeFile(tempFilePath);
                console.log("Parsed Resume Data:", JSON.stringify(parsedData, null, 2));

                if (parsedData.name) {
                    const [firstName, ...lastNameParts] = parsedData.name.split(' ');
                    // Use existing form data if provided, otherwise use parsed data
                    user.firstName = fields.firstName || firstName;
                    user.lastName = fields.lastName || lastNameParts.join(' ');
                }
                user.phone = parsedData.phone || user.phone || '';
                user.summary = parsedData.objective || user.summary || '';
                user.skills = parsedData.skills || user.skills || [];

                // Assuming your User schema for experience/education is an array of objects
                if (parsedData.experience) {
                    user.experience = parsedData.experience.split('\n').filter(line => line.trim() !== '').map((exp: string) => ({ title: exp.trim() }));
                }
                if (parsedData.education) {
                    user.education = parsedData.education.split('\n').filter(line => line.trim() !== '').map((edu: string) => ({ institution: edu.trim() }));
                }

            } catch (parseError) {
                console.error("Resume parsing failed:", parseError);
                // NOTE: Decide if you want to abort registration here or continue without resume data
                // For now, it continues.
            } finally {
                // IMPORTANT: Always clean up the temporary file
                await fs.unlink(tempFilePath).catch(err => console.error("Failed to delete temp file:", err));
            }
        }

        await user.save();

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        // Use user.email for consistency
        await Otp.findOneAndUpdate({ email: user.email }, { otp: otpCode }, { upsert: true, new: true });
        
        // Ensure EMAIL_FROM is set in your .env file
        const mailOptions = { 
            from: `TalentSync <${process.env.EMAIL_FROM}>`, 
            to: user.email, // Use user.email for consistency
            subject: 'Your Verification Code', 
            text: `Your OTP is: ${otpCode}.` 
        };
        await transporter.sendMail(mailOptions);
        
        return NextResponse.json({ message: 'OTP sent to your email. Please verify.' }, { status: 200 });

    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json({ message: 'An error occurred during registration.', error: error.message }, { status: 500 });
    }
}