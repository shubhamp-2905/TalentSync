// app/register/page.tsx

'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase, Loader2 } from "lucide-react";

// Define types for our component's state
type Step = 'selectType' | 'enterDetails' | 'verifyOtp';
type UserType = 'student' | 'recruiter';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('selectType');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    university: '', major: '', company: '', position: '',
  });
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep('enterDetails');
    setError('');
    setSuccess('');
  };

  const handleBack = () => {
    setStep('selectType');
    setUserType(null);
    setError('');
    setSuccess('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setIsLoading(true);

    const submissionData = {
        firstName: formData.firstName, lastName: formData.lastName, email: formData.email,
        password: formData.password, role: userType,
        ...(userType === 'student' ? { university: formData.university, major: formData.major } : {}),
        ...(userType === 'recruiter' ? { company: formData.company, position: formData.position } : {}),
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      
      setStep('verifyOtp');
      setSuccess(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        const res = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, otp }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Something went wrong');
        
        setSuccess(data.message + " Redirecting to login...");
        setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'selectType':
        return (
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Join TalentSync</CardTitle>
                <CardDescription>Choose your account type to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full h-auto p-6 flex flex-col items-center space-y-3 hover:border-black" onClick={() => handleUserTypeSelect('student')}>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><GraduationCap className="h-6 w-6 text-black" /></div>
                  <div className="text-center"><p className="font-semibold">I'm a Student</p><p className="text-sm text-gray-600">Find internships and job opportunities</p></div>
                </Button>
                <Button variant="outline" className="w-full h-auto p-6 flex flex-col items-center space-y-3 hover:border-black" onClick={() => handleUserTypeSelect('recruiter')}>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"><Briefcase className="h-6 w-6 text-black" /></div>
                  <div className="text-center"><p className="font-semibold">I'm a Recruiter</p><p className="text-sm text-gray-600">Hire talented students</p></div>
                </Button>
                <div className="text-center pt-4">
                  <span className="text-sm text-gray-600">Already have an account? <Link href="/login" className="font-medium text-black hover:underline">Sign in</Link></span>
                </div>
              </CardContent>
            </Card>
        );
      case 'enterDetails':
        return (
            <Card className="w-full">
              <CardHeader>
                <Button variant="ghost" size="sm" onClick={handleBack} className="justify-start p-0 mb-4 h-auto text-black hover:bg-transparent hover:underline">← Back to account type</Button>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {userType === 'student' ? <GraduationCap className="h-6 w-6 text-black" /> : <Briefcase className="h-6 w-6 text-black" />}
                    <CardTitle className="text-2xl font-bold">{userType === 'student' ? 'Student' : 'Recruiter'} Registration</CardTitle>
                  </div>
                  <CardDescription>Create your account to get started</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="firstName">First Name</Label><Input id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="John" /></div>
                    <div className="space-y-2"><Label htmlFor="lastName">Last Name</Label><Input id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Doe" /></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" /></div>
                  {userType === 'student' && (
                    <>
                      <div className="space-y-2"><Label htmlFor="university">University</Label><Input id="university" name="university" required value={formData.university} onChange={handleChange} placeholder="Your University" /></div>
                      <div className="space-y-2"><Label htmlFor="major">Major</Label><Input id="major" name="major" required value={formData.major} onChange={handleChange} placeholder="Computer Science" /></div>
                    </>
                  )}
                  {userType === 'recruiter' && (
                    <>
                      <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" name="company" required value={formData.company} onChange={handleChange} placeholder="Your Company" /></div>
                      <div className="space-y-2"><Label htmlFor="position">Job Title</Label><Input id="position" name="position" required value={formData.position} onChange={handleChange} placeholder="HR Manager" /></div>
                    </>
                  )}
                  <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} placeholder="Create a password" /></div>
                  <div className="space-y-2"><Label htmlFor="confirmPassword">Confirm Password</Label><Input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" /></div>
                  {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" size="lg" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
                  </Button>
                </form>
                <div className="text-center"><span className="text-sm text-gray-600">Already have an account? <Link href="/login" className="font-medium text-black hover:underline">Sign in</Link></span></div>
              </CardContent>
            </Card>
        );
      case 'verifyOtp':
        return (
            <Card className="w-full">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
                <CardDescription>We've sent a 6-digit code to {formData.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input id="otp" name="otp" type="text" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" />
                  </div>
                  {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                  {success && <p className="text-sm text-green-600 text-center">{success}</p>}
                  <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" size="lg" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify Account"}
                  </Button>
                </form>
                <div className="text-center">
                  <Button variant="link" className="text-sm text-black hover:underline" onClick={(e) => handleRegisterSubmit(e as any)} disabled={isLoading}>
                    Didn't receive code? Resend
                  </Button>
                </div>
              </CardContent>
            </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
            <div className="h-10 w-10 rounded-full bg-black"></div>
            <span className="font-bold text-2xl text-black">TalentSync</span>
          </Link>
        </div>
        {renderStep()}
      </div>
    </div>
  );
}