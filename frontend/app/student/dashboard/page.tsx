// app/student/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Briefcase, CheckCircle, Clock, TrendingUp, Plus, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import { Loader2 } from 'lucide-react';

// --- Type Definitions for our Dashboard Data ---
interface IStats { submitted: number; inReview: number; interviewing: number; }
interface IApplication { _id: string; job: { title: string; companyName: string; }; status: string; appliedAt: string; }
interface IJob { _id: string; title: string; companyName: string; workModel: string; jobType: string; }
interface IDashboardData {
    firstName: string;
    stats: IStats;
    recentApplications: IApplication[];
    profileCompletion: number;
    profileViews: number;
    upcomingInterviews: any[];
    recommendedJobs: IJob[];
}

// Reusable StatsCard Component
function StatsCard({ icon: Icon, label, value, change, changeType }: any) {
    const changeColor = changeType === 'positive' ? 'text-green-600' : 'text-gray-500';
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs ${changeColor}`}>{change}</p>
            </CardContent>
        </Card>
    );
}

// Helper to style status badges
const getStatusBadgeColor = (status: string) => {
    switch (status) {
        case 'Interviewing': return "bg-blue-100 text-blue-800";
        case 'In Review': return "bg-yellow-100 text-yellow-800";
        case 'Rejected': return "bg-red-100 text-red-800";
        case 'Applied':
        default: return "bg-gray-100 text-gray-800";
    }
};

export default function StudentDashboard() {
    const [data, setData] = useState<IDashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/student/dashboard');
                if (!res.ok) throw new Error("Failed to fetch data");
                const dashboardData = await res.json();
                setData(dashboardData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (!data) {
        return <div className="text-center p-8">Could not load dashboard data.</div>;
    }

    return (
        <div className="space-y-8 p-4 md:p-8">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {data.firstName}!</h1>
                    <p className="text-gray-600 mt-1">Here's what's happening with your applications.</p>
                </div>
                <Button asChild>
                    <Link href="/student/jobs" className="flex items-center">
                        <Plus className="h-4 w-4 mr-2" /> Apply to Jobs
                    </Link>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard icon={FileText} label="Applications Submitted" value={data.stats.submitted} />
                <StatsCard icon={Clock} label="Under Review" value={data.stats.inReview} />
                <StatsCard icon={CheckCircle} label="Interviews Scheduled" value={data.stats.interviewing} />
                <StatsCard icon={TrendingUp} label="Profile Views" value={data.profileViews} change="Coming soon" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Applications */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div><CardTitle>Recent Applications</CardTitle><CardDescription>Track your latest job applications</CardDescription></div>
                                <Button variant="outline" size="sm" asChild><Link href="/student/applications">View All</Link></Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.recentApplications.length > 0 ? data.recentApplications.map((app) => (
                                    <div key={app._id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><Briefcase className="h-5 w-5 text-gray-600" /></div>
                                            <div>
                                                <p className="font-semibold">{app.job.title}</p>
                                                <p className="text-sm text-gray-600">{app.job.companyName}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge className={getStatusBadgeColor(app.status)}>{app.status}</Badge>
                                            <p className="text-sm text-gray-500 mt-1">{new Date(app.appliedAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                )) : <p className="text-sm text-gray-500">You haven't applied to any jobs yet.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Upcoming Interviews */}
                    <Card>
                        <CardHeader><CardTitle className="flex items-center"><Calendar className="h-5 w-5 mr-2" /> Upcoming Interviews</CardTitle></CardHeader>
                        <CardContent>
                            {data.upcomingInterviews?.length > 0 ? (
                                <div className="space-y-3"> {/* Map through interviews here */} </div>
                            ) : <p className="text-sm text-gray-500">No upcoming interviews scheduled.</p>}
                        </CardContent>
                    </Card>

                    {/* Profile Completion */}
                    <Card>
                        <CardHeader><CardTitle>Profile Completion</CardTitle><CardDescription>Complete your profile to attract more recruiters</CardDescription></CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm"><span>Profile Progress</span><span className="font-semibold">{data.profileCompletion}%</span></div>
                                <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-black h-2 rounded-full" style={{ width: `${data.profileCompletion}%` }}></div></div>
                                <Button size="sm" className="w-full" asChild><Link href="/student/profile">Complete Profile</Link></Button>
                            </div>
                        </CardContent>
                    </Card>

                     {/* Recommended Jobs */}
                    <Card>
                        <CardHeader><CardTitle>Recommended for You</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {data.recommendedJobs.length > 0 ? data.recommendedJobs.map(job => (
                                     <div key={job._id} className="p-3 border rounded-lg">
                                         <p className="font-semibold text-sm">{job.title}</p>
                                         <p className="text-sm text-gray-600">{job.companyName}</p>
                                         <p className="text-xs text-gray-500">{job.workModel} • {job.jobType}</p>
                                         <Button size="sm" variant="outline" className="w-full mt-2" asChild><Link href={`/student/jobs/${job._id}`}><ExternalLink className="h-3 w-3 mr-2" /> View Job</Link></Button>
                                     </div>
                                )) : <p className="text-sm text-gray-500">Complete your profile to see recommendations.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}