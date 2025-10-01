'use client';

import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, Mail, Phone, MapPin, GraduationCap, Briefcase, Award,
  Plus, Edit, Download, ExternalLink, Loader2
} from "lucide-react";

// --- Define Types for Profile Data ---
interface IEducation {
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  description?: string;
}

interface IExperience {
  title?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

interface IProject {
  name?: string;
  description?: string;
  link?: string;
}

interface IUserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  summary?: string;
  profileTitle?: string;
  profilePictureUrl?: string;
  skills?: string[];
  education?: IEducation[];
  experience?: IExperience[];
  projects?: IProject[];
  socialLinks?: {
    linkedIn?: string;
    github?: string;
    portfolio?: string;
  };
}

// --- Main Component ---

export default function StudentProfile() {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [editableProfile, setEditableProfile] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch('/api/profile');
        if (!res.ok) throw new Error('Failed to fetch profile data.');
        const data = await res.json();
        setProfile(data.user);
        setEditableProfile(data.user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editableProfile) {
      setEditableProfile({ ...editableProfile, [name]: value });
    }
  };
  
  const handleNestedChange = (section: 'education' | 'experience' | 'projects', index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editableProfile) {
      const updatedSection = [...(editableProfile[section] || [])] as any[];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      setEditableProfile({ ...editableProfile, [section]: updatedSection });
    }
  };

  const addSectionItem = (section: 'education' | 'experience' | 'projects') => {
    if (editableProfile) {
      const newSection = [...(editableProfile[section] || []), {}];
      setEditableProfile({ ...editableProfile, [section]: newSection as any });
    }
  };

  const removeSectionItem = (section: 'education' | 'experience' | 'projects', index: number) => {
    if (editableProfile) {
      const newSection = [...(editableProfile[section] || [])];
      newSection.splice(index, 1);
      setEditableProfile({ ...editableProfile, [section]: newSection as any });
    }
  };

  const handleSave = async () => {
    if (!editableProfile) return;
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editableProfile),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save profile.');
      }
      const data = await res.json();
      setProfile(data.user);
      setEditableProfile(data.user);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => isEditing ? handleSave() : setIsEditing(true);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('profilePicture', file);
    try {
      const res = await fetch('/api/profile/upload-picture', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      const newUrl = data.url;
      setProfile(prev => prev ? { ...prev, profilePictureUrl: newUrl } : null);
      setEditableProfile(prev => prev ? { ...prev, profilePictureUrl: newUrl } : null);
    } catch (error) {
      console.error(error);
      setError('Failed to upload photo.');
    }
  };

  if (isLoading && !profile) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }
  if (!profile || !editableProfile) {
    return <div className="text-center">Could not load profile.</div>;
  }

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your professional profile and showcase your skills</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Download Resume</Button>
          <Button size="sm" onClick={handleEditToggle} disabled={isLoading}>
            {isLoading && isEditing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Edit className="h-4 w-4 mr-2" />}
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center"><User className="h-5 w-5 mr-2" />Personal Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="firstName">First Name</Label><Input id="firstName" name="firstName" value={editableProfile.firstName} onChange={handleProfileChange} readOnly={!isEditing} /></div>
                <div><Label htmlFor="lastName">Last Name</Label><Input id="lastName" name="lastName" value={editableProfile.lastName} onChange={handleProfileChange} readOnly={!isEditing} /></div>
                <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={editableProfile.email} readOnly disabled /></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" value={editableProfile.phone || ''} onChange={handleProfileChange} readOnly={!isEditing} /></div>
                <div className="md:col-span-2"><Label htmlFor="location">Location</Label><Input id="location" name="location" value={editableProfile.location || ''} onChange={handleProfileChange} readOnly={!isEditing} /></div>
                <div className="md:col-span-2"><Label htmlFor="summary">Professional Summary</Label><Textarea id="summary" name="summary" value={editableProfile.summary || ''} onChange={handleProfileChange} readOnly={!isEditing} className="min-h-[100px]" /></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle className="flex items-center"><GraduationCap className="h-5 w-5 mr-2" />Education</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {editableProfile.education?.map((edu, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2 relative">
                  {isEditing && (<Button variant="destructive" size="sm" className="absolute top-2 right-2 px-2 h-6" onClick={() => removeSectionItem('education', index)}>Remove</Button>)}
                  <div><Label>Degree</Label><Input name="degree" value={edu.degree || ''} onChange={(e) => handleNestedChange('education', index, e)} readOnly={!isEditing} /></div>
                  <div><Label>Institution</Label><Input name="institution" value={edu.institution || ''} onChange={(e) => handleNestedChange('education', index, e)} readOnly={!isEditing} /></div>
                </div>
              ))}
              {isEditing && <Button variant="outline" size="sm" onClick={() => addSectionItem('education')}><Plus className="h-4 w-4 mr-2" />Add Education</Button>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center"><Briefcase className="h-5 w-5 mr-2" />Experience</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {editableProfile.experience?.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2 relative">
                  {isEditing && (<Button variant="destructive" size="sm" className="absolute top-2 right-2 px-2 h-6" onClick={() => removeSectionItem('experience', index)}>Remove</Button>)}
                  <div><Label>Job Title</Label><Input name="title" value={exp.title || ''} onChange={(e) => handleNestedChange('experience', index, e)} readOnly={!isEditing} /></div>
                  <div><Label>Company</Label><Input name="company" value={exp.company || ''} onChange={(e) => handleNestedChange('experience', index, e)} readOnly={!isEditing} /></div>
                  <div><Label>Description</Label><Textarea name="description" value={exp.description || ''} onChange={(e) => handleNestedChange('experience', index, e)} readOnly={!isEditing} /></div>
                </div>
              ))}
              {isEditing && <Button variant="outline" size="sm" onClick={() => addSectionItem('experience')}><Plus className="h-4 w-4 mr-2" />Add Experience</Button>}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/png, image/jpeg" />
              {profile.profilePictureUrl ? (
                <img src={profile.profilePictureUrl} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 text-2xl font-bold">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </div>
              )}
              <h2 className="text-xl font-bold">{profile.firstName} {profile.lastName}</h2>
              <p className="text-gray-600">{profile.profileTitle || 'Student'}</p>
              <div className="flex items-center justify-center text-sm text-gray-500 mt-2">
                <MapPin className="h-4 w-4 mr-1" /> {profile.location || 'Location not set'}
              </div>
              {isEditing && (
                <Button className="w-full mt-4" size="sm" onClick={() => fileInputRef.current?.click()}>
                  Upload Photo
                </Button>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills?.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
              {isEditing && <Button variant="outline" size="sm" className="w-full mt-4"><Plus className="h-4 w-4 mr-2" />Manage Skills</Button>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}