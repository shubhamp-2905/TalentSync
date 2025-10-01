// models/User.ts

import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Sub-schemas for nested data
const EducationSchema = new Schema({
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: String,
    endDate: String,
    gpa: String,
    description: String,
});

const ExperienceSchema = new Schema({
    title: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String,
});

const ProjectSchema = new Schema({
    name: String,
    description: String,
    link: String,
});

// Main User Interface
export interface IUser extends Document {
    // Auth fields
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: 'student' | 'recruiter';
    isVerified: boolean;

    // Student Profile fields
    phone?: string;
    location?: string;
    summary?: string;
    profileTitle?: string;
    profilePictureUrl?: string;
    skills?: string[];
    education?: (mongoose.Document & IEducation)[];
    experience?: (mongoose.Document & IExperience)[];
    projects?: (mongoose.Document & IProject)[];
    socialLinks?: {
        linkedIn?: string;
        github?: string;
        portfolio?: string;
    };

    // Recruiter-specific Profile fields
    companyId?: mongoose.Schema.Types.ObjectId; // Replaces the old 'company' string
    department?: string;
    bio?: string;
}

const UserSchema: Schema<IUser> = new Schema({
    // Auth fields
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: true },
    role: { type: String, enum: ['student', 'recruiter'], required: true },
    isVerified: { type: Boolean, default: false },

    // Student Profile fields
    phone: { type: String },
    location: { type: String },
    summary: { type: String },
    profileTitle: { type: String },
    profilePictureUrl: { type: String },
    skills: [{ type: String }],
    education: [EducationSchema],
    experience: [ExperienceSchema],
    projects: [ProjectSchema],
    socialLinks: {
        linkedIn: String,
        github: String,
        portfolio: String,
    },

    // --- Recruiter specific fields (UPDATE THIS SECTION) ---
    company: { // We keep this for the registration form simplicity
        type: String,
        required: function(this: IUser) { return this.role === 'recruiter'; }
    },
    position: { // Job Title
        type: String,
        required: function(this: IUser) { return this.role === 'recruiter'; }
    },
    // --- ADD THESE NEW FIELDS ---
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    department: String,
    bio: String,

}, { timestamps: true });

// Password hashing middleware
UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;