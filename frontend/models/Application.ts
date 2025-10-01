// models/Application.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IApplication extends Document {
    job: mongoose.Schema.Types.ObjectId;
    student: mongoose.Schema.Types.ObjectId;
    status: 'Applied' | 'In Review' | 'Interviewing' | 'Offered' | 'Rejected';
    submittedResumeUrl: string;
    coverLetterNotes?: string;
    appliedAt: Date;
}

const ApplicationSchema: Schema<IApplication> = new Schema({
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Applied', 'In Review', 'Interviewing', 'Offered', 'Rejected'], default: 'Applied' },
    submittedResumeUrl: { type: String, required: true },
    coverLetterNotes: { type: String },
}, { timestamps: { createdAt: 'appliedAt' } });

const Application: Model<IApplication> = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);
export default Application;