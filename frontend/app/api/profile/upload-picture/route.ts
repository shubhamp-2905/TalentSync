// app/api/profile/upload-picture/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function POST(request: Request) {
    await dbConnect();
    try {
        const token = cookies().get('authToken')?.value;
        if (!token) return NextResponse.json({ message: 'Auth required' }, { status: 401 });
        
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const formData = await request.formData();
        const file = formData.get('profilePicture') as File;

        if (!file) return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'talentsync_profiles' }, (error, result) => {
                if (error) reject(error);
                resolve(result);
            }).end(buffer);
        });

        const profilePictureUrl = uploadResult.secure_url;
        await User.findByIdAndUpdate(decoded.id, { profilePictureUrl });
        return NextResponse.json({ message: 'Upload successful', url: profilePictureUrl });

    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
    }
}