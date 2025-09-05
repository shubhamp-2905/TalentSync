// models/Otp.ts

import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface for the OTP document
export interface IOtp extends Document {
    email: string;
    otp: string;
    createdAt: Date;
}

const OtpSchema: Schema<IOtp> = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // The document will be automatically deleted after 5 minutes
  },
});

const Otp: Model<IOtp> = mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchema);
export default Otp;