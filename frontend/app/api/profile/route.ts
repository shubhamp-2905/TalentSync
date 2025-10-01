// app/api/profile/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
    await dbConnect();
    try {
        const token = cookies().get('authToken')?.value;
        if (!token) return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }
}