// app/recruiter/profile/page.tsx

'use client';

import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building, User, Mail, Phone, MapPin, Globe, Edit, Save, 
  Users, Award, Plus, Loader2, X
} from "lucide-react";

// --- Type Definitions ---
interface ICompany {
    name: string; industry?: string; companySize?: string; founded?: number;
    website?: string; headquarters?: string; description?: string;
    benefits?: string[]; logoUrl?: string;
}
interface IRecruiter {
    firstName: string; lastName: string; email: string; phone?: string;
    position?: string; department?: string; bio?: string;
    companyId: ICompany;
}
interface IPerformance { successfulHires: number; successRate: number; avgDaysToHire: number; }

// --- Main Component ---
export default function RecruiterProfile() {
    const [profile, setProfile] = useState<{ recruiter: IRecruiter; performance: IPerformance } | null>(null);
    const [editableRecruiter, setEditableRecruiter] = useState<Partial<IRecruiter>>({});
    const [editableCompany, setEditableCompany] = useState<Partial<ICompany>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/recruiter/profile');
                if (!res.ok) throw new Error('Failed to fetch profile.');
                const data = await res.json();
                setProfile(data);
                setEditableRecruiter(data.recruiter);
                setEditableCompany(data.recruiter.companyId);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleRecruiterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditableRecruiter({ ...editableRecruiter, [e.target.name]: e.target.value });
    };

    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditableCompany({ ...editableCompany, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/recruiter/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recruiterData: editableRecruiter, companyData: editableCompany }),
            });
            if (!res.ok) throw new Error('Failed to save profile.');
            const data = await res.json();
            setProfile(prev => ({ ...prev!, recruiter: data.recruiter }));
            setEditableRecruiter(data.recruiter);
            setEditableCompany(data.recruiter.companyId);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Simplified handlers for benefits
    const addBenefit = () => {
        const newBenefit = prompt("Enter new benefit:");
        if (newBenefit && editableCompany.benefits) {
            setEditableCompany({ ...editableCompany, benefits: [...editableCompany.benefits, newBenefit]});
        }
    };
    const removeBenefit = (index: number) => {
        if (editableCompany.benefits) {
            const newBenefits = [...editableCompany.benefits];
            newBenefits.splice(index, 1);
            setEditableCompany({ ...editableCompany, benefits: newBenefits });
        }
    };


    if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    if (!profile) return <div className="text-center p-8">Could not load profile.</div>;

    const { recruiter, performance } = profile;
    const company = recruiter.companyId;

    return (
        <div className="space-y-8 p-4 md:p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Company Profile</h1>
                    <p className="text-gray-600 mt-1">Manage your company information</p>
                </div>
                <Button size="sm" onClick={() => isEditing ? handleSave() : setIsEditing(true)} disabled={isLoading}>
                    {isEditing ? <><Save className="h-4 w-4 mr-2"/>Save Changes</> : <><Edit className="h-4 w-4 mr-2"/>Edit Profile</>}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Company Information */}
                    <Card>
                        <CardHeader><CardTitle className="flex items-center"><Building className="h-5 w-5 mr-2" />Company Information</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label>Company Name</Label><Input name="name" value={editableCompany.name || ''} onChange={handleCompanyChange} readOnly={!isEditing} /></div>
                                <div><Label>Industry</Label><Input name="industry" value={editableCompany.industry || ''} onChange={handleCompanyChange} readOnly={!isEditing} /></div>
                                <div className="md:col-span-2"><Label>Website</Label><Input name="website" value={editableCompany.website || ''} onChange={handleCompanyChange} readOnly={!isEditing} /></div>
                                <div className="md:col-span-2"><Label>Company Description</Label><Textarea name="description" className="min-h-[120px]" value={editableCompany.description || ''} onChange={handleCompanyChange} readOnly={!isEditing} /></div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recruiter Information */}
                    <Card>
                        <CardHeader><CardTitle className="flex items-center"><User className="h-5 w-5 mr-2" />Your Information</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label>First Name</Label><Input name="firstName" value={editableRecruiter.firstName || ''} onChange={handleRecruiterChange} readOnly={!isEditing} /></div>
                                <div><Label>Last Name</Label><Input name="lastName" value={editableRecruiter.lastName || ''} onChange={handleRecruiterChange} readOnly={!isEditing} /></div>
                                <div><Label>Job Title</Label><Input name="position" value={editableRecruiter.position || ''} onChange={handleRecruiterChange} readOnly={!isEditing} /></div>
                                <div><Label>Email</Label><Input value={recruiter.email} readOnly disabled /></div>
                                <div className="md:col-span-2"><Label>Your Bio</Label><Textarea name="bio" className="min-h-[100px]" value={editableRecruiter.bio || ''} onChange={handleRecruiterChange} readOnly={!isEditing} /></div>
                             </div>
                        </CardContent>
                    </Card>

                    {/* Company Benefits */}
                    <Card>
                        <CardHeader><CardTitle className="flex items-center"><Award className="h-5 w-5 mr-2" />Company Benefits</CardTitle></CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {editableCompany.benefits?.map((benefit, index) => (
                                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                                        <span>{benefit}</span>
                                        {isEditing && <button onClick={() => removeBenefit(index)} className="ml-1 text-gray-500 hover:text-red-500"><X className="h-3 w-3"/></button>}
                                    </Badge>
                                ))}
                            </div>
                            {isEditing && <Button variant="outline" size="sm" onClick={addBenefit}><Plus className="h-4 w-4 mr-2" />Add Benefit</Button>}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center text-gray-500 text-2xl font-bold">
                                {company.logoUrl ? <img src={company.logoUrl} alt={company.name} className="rounded-lg object-cover w-full h-full" /> : company.name.substring(0,2)}
                            </div>
                            <h2 className="text-xl font-bold">{company.name}</h2>
                            <p className="text-gray-600">{company.industry}</p>
                            <div className="flex items-center justify-center text-sm text-gray-500 mt-2"><MapPin className="h-4 w-4 mr-1" />{company.headquarters}</div>
                            {isEditing && <Button className="w-full mt-4" size="sm">Upload Logo</Button>}
                        </CardContent>
                    </Card>

                    {/* Recruitment Stats */}
                    <Card>
                        <CardHeader><CardTitle>Recruitment Performance</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center"><p className="text-2xl font-bold text-green-600">{performance.successfulHires}</p><p className="text-sm text-gray-600">Successful Hires</p></div>
                            <div className="text-center"><p className="text-2xl font-bold text-blue-600">{performance.successRate}%</p><p className="text-sm text-gray-600">Success Rate</p></div>
                            <div className="text-center"><p className="text-2xl font-bold">{performance.avgDaysToHire}</p><p className="text-sm text-gray-600">Avg Days to Hire</p></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}