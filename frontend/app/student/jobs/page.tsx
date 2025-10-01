// app/student/jobs/page.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2, Briefcase } from 'lucide-react';
import Link from 'next/link';

// You would define the IJob type in a shared types file
interface IJob {
  _id: string;
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  workModel: string;
  createdAt: string;
}

// Reusable Job Card Component (Slightly improved UI)
function JobCard({ job }: { job: IJob }) {
    return (
        <Link href={`/student/jobs/${job._id}`} className="block">
            <div className="border bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start">
                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center mr-4">
                        <Briefcase className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                <p className="text-gray-600">{job.companyName}</p>
                            </div>
                            <div className="text-xs text-gray-500 pt-1">
                                {new Date(job.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                        <div className="flex items-center space-x-2 mt-4">
                            <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">{job.jobType}</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">{job.workModel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Enhanced Empty State Component
function NoJobsFound() {
    return (
        <div className="text-center py-16 px-6 bg-white border rounded-lg">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No Opportunities Found</h3>
            <p className="mt-1 text-sm text-gray-500">
                There are currently no jobs matching your criteria. Try adjusting your search or filters.
            </p>
        </div>
    );
}


export default function JobsPage() {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ jobType: '', workModel: '' });

    // useCallback memoizes the fetchJobs function
    const fetchJobs = useCallback(async () => {
        // Only show the main loader on the initial load
        if (jobs.length === 0) setIsLoading(true);

        const params = new URLSearchParams({
            q: searchQuery,
            jobType: filters.jobType,
            workModel: filters.workModel,
        });
        
        try {
            const res = await fetch(`/api/jobs?${params.toString()}`);
            const data = await res.json();
            setJobs(data.jobs);
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, filters, jobs.length]); // Dependencies for useCallback

    useEffect(() => {
        // Initial fetch
        fetchJobs();

        // Set up polling to refresh jobs every 30 seconds for a "real-time" feel
        const intervalId = setInterval(fetchJobs, 30000); // 30000ms = 30 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [fetchJobs]); // useEffect dependency is the memoized function

    const handleFilterChange = (filterName: 'jobType' | 'workModel', value: string) => {
        setFilters(prev => ({...prev, [filterName]: value === 'all' ? '' : value}));
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <header className="mb-8 bg-white p-6 rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Explore Opportunities</h1>
                        <p className="text-gray-600 mt-1">Find your next role from {jobs.length} available positions.</p>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <Input 
                            placeholder="Search by title, skill..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full sm:w-64"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mt-6">
                    <div>
                        <label className="text-sm font-medium text-gray-500">Job Type</label>
                        <Select onValueChange={(value) => handleFilterChange('jobType', value)}>
                            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Internship">Internship</SelectItem>
                                <SelectItem value="Full-time">Full-time</SelectItem>
                                <SelectItem value="Part-time">Part-time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-500">Work Model</label>
                        <Select onValueChange={(value) => handleFilterChange('workModel', value)}>
                            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="On-site">On-site</SelectItem>
                                <SelectItem value="Remote">Remote</SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </header>
            
            <main>
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {jobs.length > 0 ? (
                            jobs.map(job => <JobCard key={job._id} job={job} />)
                        ) : (
                            <NoJobsFound />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}