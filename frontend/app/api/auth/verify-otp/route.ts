import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Otp from '@/models/Otp';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json({ message: "Email and OTP are required." }, { status: 400 });
        }

        const otpRecord = await Otp.findOne({ email });

        if (!otpRecord || otpRecord.otp !== otp) {
            return NextResponse.json({ message: 'Invalid or expired OTP. Please try again.' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }

        user.isVerified = true;
        await user.save();
        await Otp.deleteOne({ email });

        return NextResponse.json({ message: 'Email verified successfully! You can now log in.' }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred during verification.', error: error.message }, { status: 500 });
    }
}