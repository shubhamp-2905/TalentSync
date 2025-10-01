// app/api/profile/update/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(request: Request) {
    await dbConnect();
    try {
        const token = cookies().get('authToken')?.value;
        if (!token) return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const updatedData = await request.json();
        
        delete updatedData.email; delete updatedData.password; delete updatedData.role; delete updatedData.isVerified;

        const updatedUser = await User.findByIdAndUpdate(decoded.id, updatedData, { new: true }).select('-password');
        if (!updatedUser) return NextResponse.json({ message: 'User not found' }, { status: 404 });
        return NextResponse.json({ message: 'Profile updated', user: updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
}