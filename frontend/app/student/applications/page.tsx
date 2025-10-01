// app/student/applications/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Briefcase, Calendar, MapPin, ExternalLink, Clock, CheckCircle, XCircle, Eye, Loader2 } from "lucide-react";
import Link from "next/link";

// --- Type Definitions ---
interface IJobDetails {
    _id: string;
    title: string;
    companyName: string;
    location: string;
    jobType: string;
    salaryRange?: string;
}
interface IApplication {
    _id: string;
    job: IJobDetails;
    status: string;
    appliedAt: string;
}
interface IStats {
    total: number;
    inReview: number;
    interviewing: number;
    offered: number;
}

// --- Helper Functions ---
const getStatusIcon = (status: string) => {
    switch (status) {
        case "Interviewing": return <Calendar className="h-4 w-4" />;
        case "In Review": return <Clock className="h-4 w-4" />;
        case "Offered": return <CheckCircle className="h-4 w-4" />;
        case "Rejected": return <XCircle className="h-4 w-4" />;
        default: return <Eye className="h-4 w-4" />;
    }
};

const getStatusBadgeColor = (status: string) => {
    switch (status) {
        case 'Interviewing': return "bg-blue-100 text-blue-800";
        case 'In Review': return "bg-yellow-100 text-yellow-800";
        case 'Offered': return "bg-green-100 text-green-800";
        case 'Rejected': return "bg-red-100 text-red-800";
        case 'Applied': default: return "bg-gray-100 text-gray-800";
    }
};

// --- Main Component ---
export default function StudentApplications() {
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [stats, setStats] = useState<IStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            setIsLoading(true);
            const params = new URLSearchParams({
                q: searchQuery,
                status: statusFilter,
            });
            try {
                const res = await fetch(`/api/student/applications?${params.toString()}`);
                const data = await res.json();
                setApplications(data.applications);
                setStats(data.stats);
            } catch (error) {
                console.error("Failed to fetch applications", error);
            } finally {
                setIsLoading(false);
            }
        };

        const handler = setTimeout(() => {
            fetchApplications();
        }, 500); // Debounce search

        return () => clearTimeout(handler);
    }, [searchQuery, statusFilter]);

    return (
        <div className="space-y-8 p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">My Applications</h1>
                    <p className="text-gray-600 mt-1">Track and manage all your job applications</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative"><Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" /><Input placeholder="Search applications..." className="pl-10 w-64" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
                    <Select onValueChange={(value) => setStatusFilter(value === 'all' ? '' : value)}><SelectTrigger className="w-48"><SelectValue placeholder="Filter by Status" /></SelectTrigger><SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="Applied">Applied</SelectItem><SelectItem value="In Review">In Review</SelectItem><SelectItem value="Interviewing">Interviewing</SelectItem><SelectItem value="Offered">Offered</SelectItem><SelectItem value="Rejected">Rejected</SelectItem></SelectContent></Select>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border"><p className="text-2xl font-bold">{stats?.total ?? 0}</p><p className="text-sm text-gray-600">Total Applications</p></div>
                <div className="bg-white p-4 rounded-lg border"><p className="text-2xl font-bold text-yellow-600">{stats?.inReview ?? 0}</p><p className="text-sm text-gray-600">Under Review</p></div>
                <div className="bg-white p-4 rounded-lg border"><p className="text-2xl font-bold text-blue-600">{stats?.interviewing ?? 0}</p><p className="text-sm text-gray-600">Interviews</p></div>
                <div className="bg-white p-4 rounded-lg border"><p className="text-2xl font-bold text-green-600">{stats?.offered ?? 0}</p><p className="text-sm text-gray-600">Offers</p></div>
            </div>

            {/* Applications List */}
            <Card>
                <CardHeader><CardTitle>All Applications ({applications.length})</CardTitle></CardHeader>
                <CardContent>
                    {isLoading ? (<div className="flex justify-center items-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>) : (
                        <div className="space-y-4">
                            {applications.length > 0 ? applications.map((app) => (
                                <div key={app._id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-600">{app.job.companyName.substring(0, 2)}</div>
                                            <div>
                                                <h3 className="text-lg font-semibold">{app.job.title}</h3>
                                                <p className="text-gray-600 font-medium">{app.job.companyName}</p>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                                                    <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{app.job.location}</div>
                                                    <div className="flex items-center"><Briefcase className="h-4 w-4 mr-1" />{app.job.jobType}</div>
                                                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Applied {new Date(app.appliedAt).toLocaleDateString()}</div>
                                                </div>
                                                {app.job.salaryRange && <p className="text-sm text-gray-600 mt-1">{app.job.salaryRange}</p>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge className={`${getStatusBadgeColor(app.status)} flex items-center space-x-1`}>{getStatusIcon(app.status)}<span>{app.status}</span></Badge>
                                            <Button variant="outline" size="sm" asChild><Link href={`/student/jobs/${app.job._id}`}><ExternalLink className="h-4 w-4 mr-2" /> View Job</Link></Button>
                                        </div>
                                    </div>
                                </div>
                            )) : <p className="text-center py-10 text-gray-500">No applications found.</p>}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}