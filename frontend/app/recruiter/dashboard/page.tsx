// app/recruiter/dashboard/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, TrendingUp, Calendar, Plus, Eye, MessageCircle, MapPin, Star, Loader2 } from "lucide-react";

// --- Type Definitions ---
interface IStats { totalApplications: number; activeJobPosts: number; interviewsScheduled: number; }
interface IRecentApplication {
    _id: string; status: string; appliedAt: string;
    student: { firstName: string; lastName: string; skills: string[]; };
    job: { title: string; };
}
interface IActiveJob { _id: string; title: string; location: string; jobType: string; postedDate: string; totalApplications: number; }
interface IDashboardData {
    companyName: string;
    stats: IStats;
    recentApplications: IRecentApplication[];
    activeJobs: IActiveJob[];
}

// Reusable StatsCard Component
function StatsCard({ icon: Icon, label, value, change }: any) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{change}</p>
            </CardContent>
        </Card>
    );
}

export default function RecruiterDashboard() {
    const [data, setData] = useState<IDashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if (!data) setIsLoading(true); // Only show big loader on first load
        try {
            const res = await fetch('/api/recruiter/dashboard');
            if (!res.ok) throw new Error("Failed to fetch data");
            const dashboardData = await res.json();
            setData(dashboardData);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 30000); // Refresh every 30 seconds
        return () => clearInterval(intervalId);
    }, [fetchData]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (!data) {
        return <div className="text-center p-8">Could not load dashboard data.</div>;
    }
    
    return (
        <div className="space-y-8 p-4 md:p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {data.companyName}!</h1>
                    <p className="text-gray-600 mt-1">Here's what's happening with your recruitment.</p>
                </div>
                <Button asChild><Link href="/recruiter/post-job"><Plus className="h-4 w-4 mr-2" /> Post New Job</Link></Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard icon={Users} label="Total Applications" value={data.stats.totalApplications} />
                <StatsCard icon={Briefcase} label="Active Job Posts" value={data.stats.activeJobPosts} />
                <StatsCard icon={Calendar} label="Interviews Scheduled" value={data.stats.interviewsScheduled} />
                <StatsCard icon={TrendingUp} label="Hire Rate" value="N/A" change="Analytics coming soon" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div><CardTitle>Recent Applications</CardTitle><CardDescription>New candidates across all positions</CardDescription></div>
                                <Button variant="outline" size="sm" asChild><Link href="/recruiter/applications">View All</Link></Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.recentApplications.length > 0 ? data.recentApplications.map((app) => (
                                    <div key={app._id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">{app.student.firstName[0]}{app.student.lastName[0]}</div>
                                            <div>
                                                <h3 className="font-semibold">{app.student.firstName} {app.student.lastName}</h3>
                                                <p className="text-sm text-gray-500">Applied for {app.job.title}</p>
                                                <div className="flex flex-wrap gap-1 mt-1">{app.student.skills.slice(0, 3).map((skill, i) => <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>)}</div>
                                            </div>
                                        </div>
                                        <div className="text-right"><Badge className="bg-blue-100 text-blue-800">{app.status}</Badge><p className="text-xs text-gray-500 mt-1">{new Date(app.appliedAt).toLocaleDateString()}</p></div>
                                    </div>
                                )) : <p className="text-center py-10 text-gray-500">No new applications yet.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle className="flex items-center"><Briefcase className="h-5 w-5 mr-2" /> Active Job Posts</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.activeJobs.length > 0 ? data.activeJobs.map((job) => (
                                    <div key={job._id} className="p-3 border rounded-lg">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold text-sm">{job.title}</h4>
                                                <div className="flex items-center text-xs text-gray-500 mt-1"><MapPin className="h-3 w-3 mr-1" /> {job.location}</div>
                                            </div>
                                            <Badge variant="secondary" className="text-xs">{job.totalApplications} apps</Badge>
                                        </div>
                                        <Button size="sm" variant="outline" className="w-full mt-2" asChild><Link href={`/recruiter/jobs/${job._id}/applications`}>View Applications</Link></Button>
                                    </div>
                                )) : <p className="text-center py-4 text-gray-500">No active jobs.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}