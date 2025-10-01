// app/recruiter/post-job/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PostJobPage() {
    const router = useRouter();
    const [jobData, setJobData] = useState({
        title: '',
        companyName: '',
        location: '',
        jobType: '',
        workModel: '',
        description: '',
        responsibilities: '',
        qualifications: '',
        skills: [] as string[],
        salaryRange: '',
    });
    const [skillInput, setSkillInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Pre-fill company name from recruiter's profile
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/recruiter/profile');
                const data = await res.json();
                if(data.recruiter && data.recruiter.companyId) {
                    setJobData(prev => ({...prev, companyName: data.recruiter.companyId.name}));
                }
            } catch (error) {
                console.error("Could not fetch company name", error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: 'jobType' | 'workModel', value: string) => {
        setJobData({ ...jobData, [name]: value });
    };

    const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skillInput.trim() !== '') {
            e.preventDefault();
            if (!jobData.skills.includes(skillInput.trim().toLowerCase())) {
                setJobData({ ...jobData, skills: [...jobData.skills, skillInput.trim()] });
            }
            setSkillInput('');
        }
    };
    
    const removeSkill = (skillToRemove: string) => {
        setJobData({ ...jobData, skills: jobData.skills.filter(skill => skill !== skillToRemove) });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...jobData,
                    responsibilities: jobData.responsibilities.split('\n').filter(r => r.trim() !== ''),
                    qualifications: jobData.qualifications.split('\n').filter(q => q.trim() !== ''),
                }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to post job');
            }
            
            router.push('/recruiter/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8">Create a New Job Posting</h1>
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>Fill out the details below to post a new job opportunity.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2"><Label htmlFor="title">Job Title</Label><Input id="title" name="title" value={jobData.title} onChange={handleChange} required /></div>
                            <div className="space-y-2"><Label htmlFor="location">Location</Label><Input id="location" name="location" value={jobData.location} onChange={handleChange} placeholder="e.g., San Francisco, CA or Remote" required /></div>
                            <div className="space-y-2"><Label>Job Type</Label><Select required onValueChange={(v) => handleSelectChange('jobType', v)}><SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger><SelectContent><SelectItem value="Full-time">Full-time</SelectItem><SelectItem value="Internship">Internship</SelectItem><SelectItem value="Part-time">Part-time</SelectItem><SelectItem value="Contract">Contract</SelectItem></SelectContent></Select></div>
                            <div className="space-y-2"><Label>Work Model</Label><Select required onValueChange={(v) => handleSelectChange('workModel', v)}><SelectTrigger><SelectValue placeholder="Select model..." /></SelectTrigger><SelectContent><SelectItem value="On-site">On-site</SelectItem><SelectItem value="Remote">Remote</SelectItem><SelectItem value="Hybrid">Hybrid</SelectItem></SelectContent></Select></div>
                            <div className="space-y-2 md:col-span-2"><Label htmlFor="salaryRange">Salary Range (Optional)</Label><Input id="salaryRange" name="salaryRange" value={jobData.salaryRange} onChange={handleChange} placeholder="e.g., $80,000 - $100,000" /></div>
                        </div>
                        <div className="space-y-2"><Label htmlFor="description">Job Description</Label><Textarea id="description" name="description" value={jobData.description} onChange={handleChange} className="min-h-[150px]" required /></div>
                        <div className="space-y-2"><Label htmlFor="responsibilities">Responsibilities (one per line)</Label><Textarea id="responsibilities" name="responsibilities" value={jobData.responsibilities} onChange={handleChange} className="min-h-[100px]" /></div>
                        <div className="space-y-2"><Label htmlFor="qualifications">Qualifications (one per line)</Label><Textarea id="qualifications" name="qualifications" value={jobData.qualifications} onChange={handleChange} className="min-h-[100px]" /></div>
                        <div className="space-y-2">
                            <Label htmlFor="skills">Required Skills (press Enter to add)</Label>
                            <div className="flex flex-wrap items-center gap-2 border rounded-md p-2">
                                {jobData.skills.map(skill => <Badge key={skill} variant="secondary">{skill} <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeSkill(skill)}/></Badge>)}
                                <Input id="skills" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={handleSkillKeyDown} className="flex-1 border-none outline-none shadow-none focus-visible:ring-0 p-1" placeholder="Add a skill..." />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <div className="flex justify-end"><Button type="submit" disabled={isLoading}>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Post Job</Button></div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}