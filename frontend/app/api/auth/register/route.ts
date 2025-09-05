// app/api/auth/register/route.ts (CORRECTED)

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Otp from '@/models/Otp';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
    secure: parseInt(process.env.EMAIL_SERVER_PORT || "587") === 465,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

export async function POST(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { email, password, ...userData } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }
        
        const existingVerifiedUser = await User.findOne({ email, isVerified: true });
        if (existingVerifiedUser) {
            return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
        }

        // --- CORRECTED LOGIC STARTS HERE ---
        let user = await User.findOne({ email });

        if (user) {
            // If user exists but is not verified, update their info and password
            user.set({ ...userData, password });
        } else {
            // Otherwise, create a new user instance
            user = new User({ email, password, ...userData });
        }
        
        // Calling .save() triggers the pre-save hook that hashes the password
        await user.save();
        // --- CORRECTED LOGIC ENDS HERE ---

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.findOneAndUpdate({ email }, { otp: otpCode }, { upsert: true, new: true });

        const mailOptions = {
            from: `TalentSync <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Your Verification Code for TalentSync',
            text: `Your OTP is: ${otpCode}. It will expire in 5 minutes.`,
            html: `<b>Your OTP is: ${otpCode}</b>. It will expire in 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);
        
        return NextResponse.json({ message: 'OTP sent to your email. Please verify.' }, { status: 200 });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred during registration.', error: error.message }, { status: 500 });
    }
}