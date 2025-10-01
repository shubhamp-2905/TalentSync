// app/recruiter/jobs/[jobId]/applications/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, Mail, GraduationCap } from 'lucide-react';

// Types
interface IStudent { _id: string; firstName: string; lastName: string; email: string; university?: string; skills?: string[]; profilePictureUrl?: string; }
interface IApplication { _id: string; student: IStudent; status: string; appliedAt: string; }
interface IJob { title: string; }

export default function JobApplicationsPage() {
    const params = useParams();
    const jobId = params.jobId as string;
    const [job, setJob] = useState<IJob | null>(null);
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!jobId) return;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/jobs/${jobId}/applications`);
                if (!res.ok) throw new Error('Failed to fetch data');
                const data = await res.json();
                setJob(data.job);
                setApplications(data.applications);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [jobId]);

    if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    if (!job) return <div className="text-center p-8">Job not found or you do not have permission to view this page.</div>;

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <p className="text-gray-500">Applicants for</p>
                <h1 className="text-4xl font-bold">{job.title}</h1>
                <p className="text-gray-600 mt-2">{applications.length} candidate(s) found</p>
            </header>
            
            <div className="space-y-6">
                {applications.length > 0 ? applications.map(app => (
                    <Card key={app._id}>
                        <CardContent className="p-6 flex flex-wrap justify-between items-center gap-6">
                            <div className="flex items-center space-x-4">
                                {app.student.profilePictureUrl ? (
                                    <img src={app.student.profilePictureUrl} alt="Applicant" className="h-16 w-16 rounded-full object-cover" />
                                ) : (
                                    <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xl">
                                        {app.student.firstName[0]}{app.student.lastName[0]}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-xl font-semibold">{app.student.firstName} {app.student.lastName}</h3>
                                    <p className="flex items-center text-sm text-gray-500 mt-1"><GraduationCap className="h-4 w-4 mr-2" />{app.student.university || 'University not specified'}</p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {app.student.skills?.slice(0, 4).map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Badge>{app.status}</Badge>
                                {/* This link is a placeholder for a future full student profile view */}
                                <Button variant="outline" asChild><Link href="#">View Profile</Link></Button>
                            </div>
                        </CardContent>
                    </Card>
                )) : (
                    <Card>
                        <CardContent className="p-10 text-center">
                            <p className="text-gray-500">No applications have been submitted for this job yet.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}