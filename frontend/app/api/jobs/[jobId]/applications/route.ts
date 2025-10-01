// app/api/jobs/[jobId]/applications/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import Job from '@/models/Job';
import User from '@/models/User';

export async function GET(request: Request, { params }: { params: { jobId: string } }) {
    await dbConnect();
    try {
        const token = cookies().get('authToken')?.value;
        if (!token) return NextResponse.json({ message: 'Auth required' }, { status: 401 });

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const recruiterId = decoded.id;
        const { jobId } = params;
        
        const job = await Job.findById(jobId);
        if (!job || job.postedBy.toString() !== recruiterId) {
            return NextResponse.json({ message: 'Unauthorized or Job not found' }, { status: 403 });
        }
        
        const applications = await Application.find({ job: jobId })
            .populate({ path: 'student', model: User, select: 'firstName lastName email skills university profilePictureUrl' })
            .sort({ appliedAt: -1 });

        return NextResponse.json({ job, applications });

    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch applications' }, { status: 500 });
    }
}