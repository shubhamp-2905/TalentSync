// app/api/student/applications/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Application from '@/models/Application';
import Job from '@/models/Job';

export async function GET(request: Request) {
    await dbConnect();
    
    try {
        const token = cookies().get('authToken')?.value;
        if (!token) return NextResponse.json({ message: 'Auth required' }, { status: 401 });

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const studentId = decoded.id;

        const { searchParams } = new URL(request.url);
        const searchQuery = searchParams.get('q') || '';
        const statusFilter = searchParams.get('status');

        // --- Calculate Stats (based on all applications) ---
        const stats = {
            total: await Application.countDocuments({ student: studentId }),
            inReview: await Application.countDocuments({ student: studentId, status: 'In Review' }),
            interviewing: await Application.countDocuments({ student: studentId, status: 'Interviewing' }),
            offered: await Application.countDocuments({ student: studentId, status: 'Offered' }),
        };

        // --- Fetch and Filter Application List ---
        let queryFilter: any = { student: studentId };

        if (statusFilter) {
            queryFilter.status = statusFilter;
        }

        const applications = await Application.find(queryFilter)
            .sort({ appliedAt: -1 })
            .populate({
                path: 'job',
                model: Job,
                match: { 
                    $or: [
                        { title: { $regex: searchQuery, $options: 'i' } },
                        { companyName: { $regex: searchQuery, $options: 'i' } }
                    ]
                }
            });
        
        // Filter out applications where the populated job is null (didn't match the search)
        const filteredApplications = applications.filter(app => app.job !== null);

        return NextResponse.json({
            stats,
            applications: filteredApplications,
        });

    } catch (error) {
        console.error('Fetch Applications API Error:', error);
        return NextResponse.json({ message: 'Failed to fetch applications' }, { status: 500 });
    }
}