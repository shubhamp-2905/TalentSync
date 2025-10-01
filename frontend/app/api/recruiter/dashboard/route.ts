// app/api/recruiter/dashboard/route.ts (Final Verified Code)

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User, { IUser } from '@/models/User';
import Application from '@/models/Application';
import Job from '@/models/Job';
import Company, { ICompany } from '@/models/Company';
import mongoose from 'mongoose';

export async function GET() {
    await dbConnect();
    
    try {
        const token = cookies().get('authToken')?.value;
        if (!token) return NextResponse.json({ message: 'Auth required' }, { status: 401 });

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const recruiterId = decoded.id;
        
        let recruiter: IUser | null = await User.findById(recruiterId);

        if (!recruiter || recruiter.role !== 'recruiter') {
            return NextResponse.json({ message: 'Recruiter not found' }, { status: 404 });
        }

        if (!recruiter.companyId && recruiter.company) {
            const newCompany = new Company({ name: recruiter.company });
            await newCompany.save();
            recruiter.companyId = newCompany._id;
            await recruiter.save();
        }
        
        const finalRecruiter = await User.findById(recruiterId).populate<{ companyId: ICompany }>('companyId');
        if (!finalRecruiter) return NextResponse.json({ message: 'Recruiter data could not be loaded' }, { status: 404 });

        const jobIds = await Job.find({ postedBy: recruiterId }).distinct('_id');

        const stats = {
            totalApplications: await Application.countDocuments({ job: { $in: jobIds } }),
            activeJobPosts: jobIds.length,
            interviewsScheduled: await Application.countDocuments({ job: { $in: jobIds }, status: 'Interviewing' }),
        };

        const recentApplications = await Application.find({ job: { $in: jobIds } })
            .sort({ appliedAt: -1 }).limit(4)
            .populate({ path: 'student', model: User, select: 'firstName lastName skills' })
            .populate({ path: 'job', model: Job, select: 'title' });

        const activeJobs = await Job.aggregate([
            { $match: { _id: { $in: jobIds.map(id => new mongoose.Types.ObjectId(id)) } } },
            { $sort: { createdAt: -1 } },
            { $limit: 3 },
            { $lookup: { from: 'applications', localField: '_id', foreignField: 'job', as: 'applications' } },
            { $project: { title: 1, location: 1, jobType: 1, postedDate: '$createdAt', totalApplications: { $size: '$applications' } } }
        ]);

        return NextResponse.json({
            companyName: finalRecruiter.companyId?.name || finalRecruiter.company,
            stats,
            recentApplications,
            activeJobs
        });

    } catch (error) {
        console.error('Recruiter Dashboard API Error:', error);
        return NextResponse.json({ message: 'Failed to fetch dashboard data' }, { status: 500 });
    }
}