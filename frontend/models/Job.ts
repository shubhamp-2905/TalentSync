// models/Job.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IJob extends Document {
    title: string;
    companyName: string;
    location: string;
    jobType: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
    workModel: 'On-site' | 'Remote' | 'Hybrid';
    description: string;
    responsibilities: string[];
    qualifications: string[];
    skills: string[];
    salaryRange?: string;
    jdPdfUrl?: string;
    postedBy: mongoose.Schema.Types.ObjectId; // Ref to Recruiter User
    createdAt: Date;
}

const JobSchema: Schema<IJob> = new Schema({
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], required: true },
    workModel: { type: String, enum: ['On-site', 'Remote', 'Hybrid'], required: true },
    description: { type: String, required: true },
    responsibilities: [{ type: String }],
    qualifications: [{ type: String }],
    skills: [{ type: String }],
    salaryRange: { type: String },
    jdPdfUrl: { type: String },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
export default Job;