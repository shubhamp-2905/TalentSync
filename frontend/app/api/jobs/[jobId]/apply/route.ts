// app/api/jobs/[jobId]/apply/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import Job from '@/models/Job';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function POST(request: Request, { params }: { params: { jobId: string } }) {
    await dbConnect();
    try {
        const token = cookies().get('authToken')?.value;
        if (!token) return NextResponse.json({ message: 'Auth required' }, { status: 401 });
        
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const studentId = decoded.id;
        const { jobId } = params;

        // Check if student has already applied
        const existingApplication = await Application.findOne({ job: jobId, student: studentId });
        if (existingApplication) {
            return NextResponse.json({ message: 'You have already applied for this job.' }, { status: 409 });
        }

        const formData = await request.formData();
        const file = formData.get('resume') as File;
        const coverLetterNotes = formData.get('coverLetterNotes') as string;

        if (!file) {
            return NextResponse.json({ message: 'Resume is required' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'talentsync_resumes' }, (error, result) => {
                if (error) reject(error);
                resolve(result);
            }).end(buffer);
        });

        const newApplication = new Application({
            job: jobId,
            student: studentId,
            submittedResumeUrl: uploadResult.secure_url,
            coverLetterNotes,
        });

        await newApplication.save();
        return NextResponse.json({ message: 'Application submitted successfully!' });

    } catch (error) {
        console.error('Apply API Error:', error);
        return NextResponse.json({ message: 'Application failed' }, { status: 500 });
    }
}