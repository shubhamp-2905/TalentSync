// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
}

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { email, password } = await request.json();

        // 1. Basic validation
        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
        }

        // 2. Find the user in the database
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            // Use a generic error message for security
            return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
        }

        // 3. Check if the user's account is verified
        if (!user.isVerified) {
            return NextResponse.json({ message: 'Please verify your email before logging in.' }, { status: 403 });
        }

        // 4. Compare the provided password with the stored hash
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
        }

        // 5. Create JWT payload
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
        };

        // 6. Sign the JWT
        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: '7d', // Token will expire in 7 days
        });

        // 7. Serialize the cookie
        const serializedCookie = serialize('authToken', token, {
            httpOnly: true, // Prevents access from client-side JavaScript
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
            path: '/',
        });

        // 8. Return a success response with the user data and set the cookie
        const userResponse = {
            id: user._id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        return new Response(JSON.stringify({ message: 'Login successful!', user: userResponse }), {
            status: 200,
            headers: { 'Set-Cookie': serializedCookie },
        });

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'An error occurred during login.' }, { status: 500 });
    }
}