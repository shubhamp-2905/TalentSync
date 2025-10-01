// app/api/jobs/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';

// GET Handler for students to fetch jobs
export async function GET(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || '';
        const jobType = searchParams.get('jobType');
        const workModel = searchParams.get('workModel');
        
        const filter: any = {
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { companyName: { $regex: query, $options: 'i' } },
                { skills: { $regex: query, $options: 'i' } }
            ]
        };

        if (jobType) filter.jobType = jobType;
        if (workModel) filter.workModel = workModel;

        const jobs = await Job.find(filter).sort({ createdAt: -1 });
        return NextResponse.json({ jobs });
    } catch (error) {
        console.error('Failed to fetch jobs:', error);
        return NextResponse.json({ message: 'Failed to fetch jobs' }, { status: 500 });
    }
}

// POST Handler for recruiters to create a new job
export async function POST(request: Request) {
    await dbConnect();
    try {
        const token = cookies().get('authToken')?.value;
        if (!token) return NextResponse.json({ message: 'Auth required' }, { status: 401 });

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const recruiterId = decoded.id;

        const jobData = await request.json();

        if (!jobData.title || !jobData.description) {
            return NextResponse.json({ message: 'Required fields are missing' }, { status: 400 });
        }

        const newJob = new Job({ ...jobData, postedBy: recruiterId });
        await newJob.save();

        return NextResponse.json({ message: 'Job posted successfully!', job: newJob }, { status: 201 });
    } catch (error) {
        console.error('Failed to post job:', error);
        return NextResponse.json({ message: 'Failed to post job' }, { status: 500 });
    }
}