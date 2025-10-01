// app/api/student/dashboard/route.ts (Corrected)

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Application from '@/models/Application';
import Job from '@/models/Job';

export async function GET() {
    await dbConnect();
    
    try {
        const token = cookies().get('authToken')?.value;
        if (!token) return NextResponse.json({ message: 'Auth required' }, { status: 401 });

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const studentId = decoded.id;

        const student = await User.findById(studentId);
        if (!student) return NextResponse.json({ message: 'User not found' }, { status: 404 });

        // --- Fetch Application Stats ---
        const stats = {
            submitted: await Application.countDocuments({ student: studentId }),
            inReview: await Application.countDocuments({ student: studentId, status: 'In Review' }),
            interviewing: await Application.countDocuments({ student: studentId, status: 'Interviewing' }),
        };

        // --- Fetch Recent Applications ---
        const recentApplications = await Application.find({ student: studentId })
            .sort({ appliedAt: -1 })
            .limit(4)
            .populate({ path: 'job', model: Job, select: 'title companyName' });

        // --- Calculate Profile Completion ---
        let completionScore = 0;
        const totalChecks = 5;
        if (student.summary) completionScore++;
        if (student.skills && student.skills.length > 0) completionScore++;
        if (student.experience && student.experience.length > 0) completionScore++;
        if (student.education && student.education.length > 0) completionScore++;
        if (student.profilePictureUrl) completionScore++;
        const profileCompletion = Math.round((completionScore / totalChecks) * 100);

        // --- Recommended Jobs (simple version based on skills) ---
        const recommendedJobs = await Job.find({ skills: { $in: student.skills } })
            .limit(2);
            
        // --- Placeholders for future features ---
        const profileViews = 0; 
        const upcomingInterviews: any[] = []; // Guarantees this is an empty array

        return NextResponse.json({
            firstName: student.firstName,
            stats,
            recentApplications,
            profileCompletion,
            profileViews,
            upcomingInterviews, // Ensure this is always included in the response
            recommendedJobs,
        });

    } catch (error) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json({ message: 'Failed to fetch dashboard data' }, { status: 500 });
    }
}