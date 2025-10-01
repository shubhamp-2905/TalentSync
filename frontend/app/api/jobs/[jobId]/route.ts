// app/api/jobs/[jobId]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';

export async function GET(request: Request, { params }: { params: { jobId: string } }) {
    await dbConnect();
    try {
        const job = await Job.findById(params.jobId);
        if (!job) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }
        return NextResponse.json({ job });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch job' }, { status: 500 });
    }
}