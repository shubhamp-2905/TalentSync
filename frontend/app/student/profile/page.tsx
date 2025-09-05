import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Award,
  Plus,
  Edit,
  Download,
  ExternalLink
} from "lucide-react"

export default function StudentProfile() {
  const skills = [
    "React", "JavaScript", "TypeScript", "Node.js", "Python", 
    "SQL", "Git", "AWS", "MongoDB", "Express.js"
  ]

  const experiences = [
    {
      title: "Frontend Developer Intern",
      company: "TechStartup Inc.",
      duration: "Jun 2023 - Aug 2023",
      description: "Developed responsive web applications using React and TypeScript. Collaborated with design team to implement user-friendly interfaces."
    },
    {
      title: "Web Development Freelancer",
      company: "Self-employed",
      duration: "Jan 2023 - Present",
      description: "Created custom websites for small businesses using modern web technologies. Managed client relationships and project timelines."
    }
  ]

  const projects = [
    {
      name: "E-commerce Platform",
      description: "Full-stack web application built with React, Node.js, and MongoDB",
      link: "https://github.com/johndoe/ecommerce"
    },
    {
      name: "Task Management App",
      description: "React Native mobile app with real-time synchronization",
      link: "https://github.com/johndoe/taskapp"
    },
    {
      name: "Data Visualization Dashboard",
      description: "Interactive dashboard built with D3.js and Python Flask",
      link: "https://github.com/johndoe/dashboard"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your professional profile and showcase your skills</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </Button>
          <Button size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@university.edu" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="San Francisco, CA" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <textarea
                    id="summary"
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="Passionate computer science student with hands-on experience in full-stack development. Skilled in modern web technologies and eager to contribute to innovative projects in a dynamic team environment."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
                    <p className="text-gray-600">University of California, Berkeley</p>
                    <p className="text-sm text-gray-500">Sep 2021 - May 2025 (Expected)</p>
                    <p className="text-sm text-gray-600 mt-1">GPA: 3.8/4.0</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-600">
                    <strong>Relevant Coursework:</strong> Data Structures, Algorithms, Database Systems, 
                    Software Engineering, Machine Learning, Computer Networks
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                </div>
              ))}
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Photo & Quick Info */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-navy-600 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <h2 className="text-xl font-bold text-navy-800">John Doe</h2>
              <p className="text-gray-600">Computer Science Student</p>
              <div className="flex items-center justify-center text-sm text-gray-500 mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                San Francisco, CA
              </div>
              <Button className="w-full mt-4" size="sm">
                Upload Photo
              </Button>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>john.doe@university.edu</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-sm">
                <ExternalLink className="h-4 w-4 mr-2 text-gray-500" />
                <a href="#" className="text-primary hover:underline">LinkedIn Profile</a>
              </div>
              <div className="flex items-center text-sm">
                <ExternalLink className="h-4 w-4 mr-2 text-gray-500" />
                <a href="#" className="text-primary hover:underline">GitHub Profile</a>
              </div>
            </CardContent>
          </Card>

          {/* Profile Visibility */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Visibility</span>
                <Badge variant="accent">Public</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Available for Work</span>
                <Badge className="bg-green-100 text-green-800">Yes</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Views</span>
                <span className="text-sm font-semibold">48 this month</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}