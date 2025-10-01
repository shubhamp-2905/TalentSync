'use client';

import React, { useState, useCallback } from 'react';
import { FileUp, Loader2, Zap, Search, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';

// --- Type Definitions for Structured LLM Response (Keep these for client parsing) ---

// Define the structure of an individual resource
interface Resource {
    type: 'Project' | 'Course' | 'Book' | 'Repository' | 'Certification';
    title: string;
    description: string;
    link: string;
}

// Define the structure of a phase in the roadmap
interface RoadmapPhase {
    phaseNumber: number;
    title: string;
    durationEstimate: string; // e.g., "4-6 Weeks"
    goals: string[];
    actionItems: string[];
    resources: Resource[];
}

// Define the overall structure of the AI analysis result
interface RoadmapResult {
    targetRole: string;
    fitScore: number; // 0-100 score
    coreGaps: string[];
    roadmap: RoadmapPhase[];
    analysisSummary: string;
}

// --- Component Utilities (Mocked based on user's context) ---
// Assuming standard Tailwind setup and reusable components like Button
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline', isLoading?: boolean }> = ({ children, variant = 'default', isLoading, ...props }) => (
    <button
        className={`px-4 py-2 font-semibold text-sm rounded-lg transition-colors flex items-center justify-center space-x-2 ${variant === 'default' ? 'bg-black text-white hover:bg-gray-800' : 'bg-white border border-gray-300 text-black hover:bg-gray-50'}`}
        disabled={isLoading || props.disabled}
        {...props}
    >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
    </button>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black" {...props} />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
    <textarea rows={4} className="flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black" {...props} />
);

// --- Main Page Component ---

export default function AICareerLab() {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [jobRole, setJobRole] = useState('Data Analyst');
    const [isLoading, setIsLoading] = useState(false);
    const [roadmapData, setRoadmapData] = useState<RoadmapResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Function to handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 1024 * 1024) { // 1MB limit for demo
                setError("File size exceeds 1MB. Please upload a shorter resume.");
                setResumeFile(null);
            } else {
                setResumeFile(file);
                // Clear error related to file size/upload
                if (error && error.includes("Failed to generate roadmap")) {
                     setError(null);
                }
            }
        }
    };

    // LLM Interaction Function - Now calls the local API route
    const generateRoadmap = useCallback(async () => {
        if (!resumeFile || !jobRole) {
            setError('Please upload your resume and specify the target job role.');
            return;
        }

        setIsLoading(true);
        setRoadmapData(null);
        setError(null);

        // 1. Read the file content
        const reader = new FileReader();
        reader.onload = async (e) => {
            let resumeText = e.target?.result as string;
            
            // CRITICAL SANITIZATION STEP: 
            // Replace newlines and potentially problematic characters with spaces or remove them
            // This prevents issues when serializing the resume content inside the JSON payload.
            resumeText = resumeText.replace(/[\n\r]+/g, ' ').replace(/[\t]+/g, ' ').trim();
            
            try {
                // 2. Call the new server-side API route
                const response = await fetch('/api/upskill-analysis', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // Send required data to the server
                    body: JSON.stringify({ resumeText, jobRole }),
                });

                if (!response.ok) {
                    const errorJson = await response.json();
                    // Display the error returned by the server
                    throw new Error(errorJson.error || `Request failed with status ${response.status}`);
                }

                // Server should return the final, clean RoadmapResult JSON
                const parsedData = await response.json() as RoadmapResult;
                setRoadmapData(parsedData);

            } catch (err: any) {
                console.error("Roadmap Generation Error:", err);
                // The error message now comes from the server, which includes the status code
                setError(`Failed to generate roadmap: ${err.message || 'An unknown error occurred. Please try again.'}`);
            } finally {
                setIsLoading(false);
            }
        };

        // Read the file as text to be sent in the POST request body
        reader.readAsText(resumeFile);

    }, [resumeFile, jobRole]);

    // --- Component for Rendering the Roadmap ---

    const RoadmapView = ({ data }: { data: RoadmapResult }) => (
        <div className="mt-8 p-6 bg-white border border-gray-100 rounded-xl shadow-lg">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
                <h2 className="text-3xl font-extrabold text-black flex items-center space-x-3">
                    <Zap className="h-7 w-7 text-black" />
                    <span>Hyper-Personalized Roadmap for: {data.targetRole}</span>
                </h2>
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-500">Resume Fit Score</p>
                    <p className="text-5xl font-extrabold text-black">{data.fitScore}<span className="text-lg">%</span></p>
                </div>
            </div>

            <p className="text-lg font-medium text-gray-700 mb-6">{data.analysisSummary}</p>

            {/* Critical Gaps Section */}
            <div className="mb-8 p-4 bg-red-50/70 border border-red-200 rounded-lg">
                <h3 className="text-xl font-bold text-red-700 flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Critical Skill Gaps Identified</span>
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {data.coreGaps.map((gap, index) => (
                        <li key={index} className="text-sm">{gap}</li>
                    ))}
                </ul>
            </div>

            {/* Roadmap Phases */}
            <div className="space-y-10">
                {data.roadmap.map((phase) => (
                    <div key={phase.phaseNumber} className="border-l-4 border-black pl-6">
                        <div className="flex items-baseline space-x-3 mb-4 -ml-9">
                            <span className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shadow-md">{phase.phaseNumber}</span>
                            <h4 className="text-2xl font-bold text-black">{phase.title}</h4>
                            <span className="text-sm text-gray-500 font-medium">({phase.durationEstimate})</span>
                        </div>
                        
                        <h5 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Goals:</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                            {phase.goals.map((goal, i) => <li key={i} className="text-sm">{goal}</li>)}
                        </ul>

                        <h5 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Action Items:</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                            {phase.actionItems.map((item, i) => <li key={i} className="text-sm font-medium">{item}</li>)}
                        </ul>

                        <h5 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Key Resources:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {phase.resources.map((resource, i) => (
                                <div key={i} className="p-4 border border-gray-100 rounded-lg bg-gray-50 shadow-sm">
                                    <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white mb-2">
                                        {resource.type}
                                    </span>
                                    <p className="font-semibold text-gray-900">{resource.title}</p>
                                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                                    <a href={resource.link || '#'} target="_blank" rel="noopener noreferrer" className="text-sm text-black underline mt-2 block hover:text-gray-700">
                                        View Resource <ChevronRight className="inline h-3 w-3" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // --- Render Component ---

    return (
        <div className="min-h-[calc(100vh-64px)] p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-black flex items-center space-x-3">
                    <Zap className="h-8 w-8 text-black" />
                    <span>TalentSync AI Career Lab</span>
                </h1>
                <p className="mt-2 text-lg text-gray-600">Upload your resume and the target job role for a hyper-personalized, market-grounded roadmap to success.</p>

                <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Input Section */}
                    <div className="col-span-1 space-y-4">
                        <div className="space-y-1">
                            <label htmlFor="jobRole" className="text-sm font-medium text-gray-700 block">Target Job Role</label>
                            <Input
                                id="jobRole"
                                placeholder="e.g., Data Analyst, Frontend Developer"
                                value={jobRole}
                                onChange={(e) => setJobRole(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="resumeUpload" className="text-sm font-medium text-gray-700 block">Upload Resume (PDF/TXT/DOCX)</label>
                            <label htmlFor="resumeUpload" className="flex items-center justify-center h-24 w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors">
                                <div className="text-center">
                                    {resumeFile ? (
                                        <div className="flex items-center space-x-2 text-green-600">
                                            <CheckCircle className="h-5 w-5" />
                                            <span className="text-sm font-medium">{resumeFile.name} uploaded.</span>
                                        </div>
                                    ) : (
                                        <div className="text-gray-500 flex items-center space-x-2">
                                            <FileUp className="h-5 w-5" />
                                            <span className="text-sm">Click to upload or drag & drop</span>
                                        </div>
                                    )}
                                </div>
                            </label>
                            <input
                                id="resumeUpload"
                                type="file"
                                accept=".txt,.pdf" // Only allow text/pdf for easier simulation. Need parsing for docx/pdf in a real app.
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <Button bg-black-50 border-red-400
                            onClick={generateRoadmap}
                            isLoading={isLoading}
                            disabled={!resumeFile || !jobRole || isLoading}
                            className="w-full mt-4"
                        >
                            {isLoading ? 'Analyzing Resume...' : 'Generate AI Roadmap'}
                        </Button>
                    </div>

                    {/* Output/Status Section */}
                    <div className="col-span-2 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center min-h-[200px] text-center">
                        {isLoading && (
                            <div className="flex flex-col items-center">
                                <Loader2 className="h-8 w-8 animate-spin text-black" />
                                <p className="mt-2 text-black font-semibold">Generating your hyper-personalized plan...</p>
                                <p className="text-sm text-gray-500">This process is now handled securely on the server.</p>
                            </div>
                        )}
                        {!isLoading && !roadmapData && (
                            <div className="text-gray-500">
                                <Search className="h-6 w-6 mx-auto mb-2" />
                                <p className="text-base">Your roadmap will appear here after analysis.</p>
                            </div>
                        )}
                        {!isLoading && roadmapData && (
                            <div className="text-black">
                                <p className="text-lg font-semibold">Analysis Complete!</p>
                                <p className="text-sm text-gray-600">Scroll down to view your 4-Phase Career Roadmap.</p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Roadmap Display */}
                {roadmapData && <RoadmapView data={roadmapData} />}

            </div>
        </div>
    );
}
