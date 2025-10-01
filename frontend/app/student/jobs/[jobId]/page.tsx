// app/student/jobs/[jobId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Briefcase, MapPin, Clock, CheckCircle } from 'lucide-react';
import { ApplyModal } from '@/components/student/ApplyModal';

interface IJob {
    _id: string; title: string; companyName: string; location: string;
    jobType: string; workModel: string; description: string;
    responsibilities: string[]; qualifications: string[]; skills: string[];
}

export default function JobDetailsPage() {
    const params = useParams();
    const jobId = params.jobId as string;
    const [job, setJob] = useState<IJob | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        if (!jobId) return;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/jobs/${jobId}`);
                if (!res.ok) throw new Error('Failed to fetch job');
                const data = await res.json();
                setJob(data.job);
            } catch (error) { console.error(error); } finally { setIsLoading(false); }
        };
        fetchData();
    }, [jobId]);

    const handleApplicationSuccess = () => {
        setIsModalOpen(false);
        setHasApplied(true);
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    if (!job) return <div className="text-center p-8">Job not found.</div>;

    return (
        <>
            <ApplyModal 
                jobId={job._id}
                open={isModalOpen} 
                onOpenChange={setIsModalOpen}
                onApplicationSuccess={handleApplicationSuccess}
            />
            <div className="p-4 md:p-8">
                <header className="mb-8 border-b pb-8">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                            <h1 className="text-4xl font-bold">{job.title}</h1>
                            <p className="text-xl text-gray-600 mt-2">{job.companyName}</p>
                            <div className="flex items-center space-x-4 text-gray-500 mt-4">
                                <span className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> {job.location}</span>
                                <span className="flex items-center"><Briefcase className="h-4 w-4 mr-2" /> {job.jobType}</span>
                                <span className="flex items-center"><Clock className="h-4 w-4 mr-2" /> {job.workModel}</span>
                            </div>
                        </div>
                        <Button size="lg" onClick={() => setIsModalOpen(true)} disabled={hasApplied}>
                            {hasApplied ? <><CheckCircle className="mr-2 h-4 w-4" />Applied</> : 'Apply Now'}
                        </Button>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Job Description</CardTitle></CardHeader>
                            <CardContent><p className="text-gray-700 whitespace-pre-wrap">{job.description}</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Responsibilities</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    {job.responsibilities.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Qualifications</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    {job.qualifications.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader><CardTitle>Skills Required</CardTitle></CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {job.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    );
}