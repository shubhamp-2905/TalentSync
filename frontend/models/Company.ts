// models/Company.ts

import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICompany extends Document {
    name: string;
    industry?: string;
    companySize?: string;
    founded?: number;
    website?: string;
    headquarters?: string;
    description?: string;
    benefits?: string[];
    logoUrl?: string;
}

const CompanySchema: Schema<ICompany> = new Schema({
    name: { type: String, required: true },
    industry: String,
    companySize: String,
    founded: Number,
    website: String,
    headquarters: String,
    description: String,
    benefits: [String],
    logoUrl: String,
}, { timestamps: true });

const Company: Model<ICompany> = mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema);
export default Company;