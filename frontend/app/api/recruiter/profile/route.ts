// app/api/recruiter/profile/route.ts (Corrected)

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User, { IUser } from '@/models/User';
import Company, { ICompany } from '@/models/Company';
import Job from '@/models/Job';
import Application from '@/models/Application';

// --- GET handler to fetch all profile data ---
export async function GET() {
    await dbConnect();
    try {
        const token = cookies().get('authToken')?.value;
        if (!token) return NextResponse.json({ message: 'Auth required' }, { status: 401 });

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const recruiterId = decoded.id;

        // --- CHANGE IS HERE: Explicitly type the 'recruiter' variable ---
        let recruiter: IUser | null = await User.findById(recruiterId);

        if (!recruiter || recruiter.role !== 'recruiter') {
            return NextResponse.json({ message: 'Recruiter not found' }, { status: 404 });
        }

        // --- NEW LOGIC: Check for and create company if it doesn't exist ---
        // TypeScript is now happy because the check above confirms 'recruiter' is not null.
        if (!recruiter.companyId) {
            // Create a new company profile from the registration data
            const newCompany = new Company({ name: recruiter.company });
            await newCompany.save();

            // Link the new company to the recruiter and save
            recruiter.companyId = newCompany._id;
            await recruiter.save();
        }
        
        // Fetch the recruiter again, this time with the company populated
        const finalRecruiter = await User.findById(recruiterId).populate<{ companyId: ICompany }>('companyId');

        // --- Aggregate Performance Stats ---
        const postedJobs = await Job.find({ postedBy: recruiterId }).select('_id');
        const jobIds = postedJobs.map(job => job._id);
        
        const hires = await Application.countDocuments({ job: { $in: jobIds }, status: 'Offered' });
        
        const performance = {
            successfulHires: hires,
            successRate: 68, // Placeholder
            avgDaysToHire: 12, // Placeholder
        };

        const recentHires: any[] = []; // Placeholder

        return NextResponse.json({ recruiter: finalRecruiter, performance, recentHires });

    } catch (error) {
        console.error('Fetch Recruiter Profile Error:', error);
        return NextResponse.json({ message: 'Failed to fetch profile' }, { status: 500 });
    }
}


// --- PUT handler to update the profile (no changes) ---
export async function PUT(request: Request) {
    await dbConnect();
    try {
        const token = cookies().get('authToken')?.value;
        if (!token) return NextResponse.json({ message: 'Auth required' }, { status: 401 });

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const recruiterId = decoded.id;

        const { recruiterData, companyData } = await request.json();

        const updatedRecruiter = await User.findByIdAndUpdate(recruiterId, recruiterData, { new: true });
        
        await Company.findByIdAndUpdate(updatedRecruiter?.companyId, companyData, { new: true });
        
        const finalRecruiterData = await User.findById(recruiterId).populate('companyId');

        return NextResponse.json({ message: 'Profile updated successfully', recruiter: finalRecruiterData });
    } catch (error) {
        console.error('Update Recruiter Profile Error:', error);
        return NextResponse.json({ message: 'Failed to update profile' }, { status: 500 });
    }
}