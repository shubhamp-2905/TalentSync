// models/User.ts

import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface for the User document
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Optional on the document instance after hashing
  role: 'student' | 'recruiter';
  isVerified: boolean;
  university?: string;
  major?: string;
  company?: string;
  position?: string;
}

const UserSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: [true, 'First name is required.'] },
  lastName: { type: String, required: [true, 'Last name is required.'] },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email.'],
  },
  password: { type: String, required: [true, 'Password is required.'] },
  role: { type: String, enum: ['student', 'recruiter'], required: true },
  isVerified: { type: Boolean, default: false },

  // Student specific fields
  university: {
    type: String,
    required: function(this: IUser) { return this.role === 'student'; }
  },
  major: {
    type: String,
    required: function(this: IUser) { return this.role === 'student'; }
  },

  // Recruiter specific fields
  company: {
    type: String,
    required: function(this: IUser) { return this.role === 'recruiter'; }
  },
  position: {
    type: String,
    required: function(this: IUser) { return this.role === 'recruiter'; }
  }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Prevent mongoose from recompiling the model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;