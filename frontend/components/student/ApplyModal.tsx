// components/student/ApplyModal.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface ApplyModalProps {
    jobId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onApplicationSuccess: () => void;
}

export function ApplyModal({ jobId, open, onOpenChange, onApplicationSuccess }: ApplyModalProps) {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [coverLetterNotes, setCoverLetterNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!resumeFile) {
            setError('Please upload a resume.');
            return;
        }
        setIsLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('coverLetterNotes', coverLetterNotes);

        try {
            const res = await fetch(`/api/jobs/${jobId}/apply`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Submission failed');
            
            onApplicationSuccess(); // Notify parent component of success
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply for this Job</DialogTitle>
                    <DialogDescription>Submit your application by uploading a resume.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="resume">Updated Resume (PDF, DOCX)</Label>
                        <Input id="resume" type="file" required onChange={(e) => e.target.files && setResumeFile(e.target.files[0])} accept=".pdf,.doc,.docx" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Cover Letter / Notes (Optional)</Label>
                        <Textarea id="notes" placeholder="Add a short note to the recruiter..." value={coverLetterNotes} onChange={(e) => setCoverLetterNotes(e.target.value)} />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Application
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}