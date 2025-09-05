// app/login/page.tsx

'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to login');
            }

            // On successful login, the cookie is set automatically by the browser from the 'Set-Cookie' header.
            // Now, redirect based on user role.
            const userRole = data.user?.role;
            if (userRole === 'student') {
                router.push('/student/dashboard');
            } else if (userRole === 'recruiter') {
                router.push('/recruiter/dashboard');
            } else {
                router.push('/'); // Fallback redirect
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
                        <div className="h-10 w-10 rounded-full bg-black"></div>
                        <span className="font-bold text-2xl text-black">TalentSync</span>
                    </Link>
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                        <CardDescription>Sign in to your account to continue</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-end text-sm">
                                <Link href="/forgot-password" className="font-medium text-black hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                            <div className="space-y-4 pt-2">
                                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" size="lg" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
                                </Button>
                                
                                <div className="text-center">
                                    <span className="text-sm text-gray-600">
                                        Don't have an account?{" "}
                                        <Link href="/register" className="font-medium text-black hover:underline">
                                            Sign up
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}