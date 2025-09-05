import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Star, 
  GraduationCap, 
  MapPin,
  Calendar,
  Mail,
  Phone,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Download
} from "lucide-react"

export default function RecruiterApplications({ params }: { params: { jobId: string } }) {
  const applications = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@berkeley.edu",
      phone: "+1 (555) 123-4567",
      university: "UC Berkeley",
      major: "Computer Science",
      gpa: "3.9",
      graduationDate: "May 2024",
      location: "San Francisco, CA",
      appliedDate: "2024-01-15",
      status: "New",
      resumeUrl: "/resume-sarah-chen.pdf",
      skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
      experience: "2 internships, 3 personal projects",
      coverLetter: "I am excited to apply for the Frontend Developer position at TechCorp. My experience with React and TypeScript, combined with my passion for creating user-friendly interfaces, makes me a perfect fit for this role."
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      email: "m.rodriguez@stanford.edu",
      phone: "+1 (555) 987-6543",
      university: "Stanford University",
      major: "Software Engineering",
      gpa: "3.7",
      graduationDate: "December 2024",
      location: "Palo Alto, CA",
      appliedDate: "2024-01-14",
      status: "Under Review",
      resumeUrl: "/resume-michael-rodriguez.pdf",
      skills: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kubernetes"],
      experience: "1 internship, 5 personal projects",
      coverLetter: "As a passionate software engineer with experience in backend development, I am thrilled about the opportunity to contribute to TechCorp's innovative projects."
    },
    {
      id: 3,
      name: "Emily Johnson",
      email: "emily.j@mit.edu",
      phone: "+1 (555) 456-7890",
      university: "MIT",
      major: "Computer Science",
      gpa: "3.8",
      graduationDate: "June 2024",
      location: "Boston, MA",
      appliedDate: "2024-01-12",
      status: "Interview Scheduled",
      resumeUrl: "/resume-emily-johnson.pdf",
      skills: ["JavaScript", "React", "Vue.js", "CSS", "Figma"],
      experience: "1 internship, 4 personal projects, freelance work",
      coverLetter: "I am writing to express my strong interest in the Frontend Developer position. My background in both development and design allows me to create exceptional user experiences."
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@cmu.edu",
      phone: "+1 (555) 321-0987",
      university: "Carnegie Mellon",
      major: "Computer Science",
      gpa: "3.9",
      graduationDate: "May 2024",
      location: "Pittsburgh, PA",
      appliedDate: "2024-01-10",
      status: "Interview Completed",
      resumeUrl: "/resume-david-kim.pdf",
      skills: ["Python", "React", "Django", "PostgreSQL", "Machine Learning"],
      experience: "2 internships, research assistant, 6 personal projects",
      coverLetter: "I am excited about the opportunity to bring my full-stack development skills and machine learning knowledge to TechCorp's dynamic team."
    },
    {
      id: 5,
      name: "Alex Thompson",
      email: "a.thompson@ucla.edu",
      phone: "+1 (555) 654-3210",
      university: "UCLA",
      major: "Computer Science",
      gpa: "3.6",
      graduationDate: "June 2024",
      location: "Los Angeles, CA",
      appliedDate: "2024-01-08",
      status: "Rejected",
      resumeUrl: "/resume-alex-thompson.pdf",
      skills: ["JavaScript", "React", "Node.js", "MongoDB"],
      experience: "1 internship, 2 personal projects",
      coverLetter: "I am very interested in the Frontend Developer role at TechCorp and believe my skills in modern web development would be valuable to your team."
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-800"
      case "Under Review": return "bg-yellow-100 text-yellow-800"
      case "Interview Scheduled": return "bg-purple-100 text-purple-800"
      case "Interview Completed": return "bg-green-100 text-green-800"
      case "Rejected": return "bg-red-100 text-red-800"
      case "Offer Extended": return "bg-emerald-100 text-emerald-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Interview Scheduled": return <Calendar className="h-4 w-4" />
      case "Interview Completed": return <CheckCircle className="h-4 w-4" />
      case "Rejected": return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">Frontend Developer Applications</h1>
          <p className="text-gray-600 mt-1">Review and manage candidate applications</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Applications
          </Button>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search candidates..."
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Job Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Frontend Developer</CardTitle>
              <CardDescription>Full-time • San Francisco, CA • Posted 2 weeks ago</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-navy-800">{applications.length}</p>
              <p className="text-sm text-gray-600">Total Applications</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Applications Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border text-center">
          <p className="text-2xl font-bold text-blue-600">1</p>
          <p className="text-sm text-gray-600">New</p>
        </div>
        <div className="bg-white p-4 rounded-lg border text-center">
          <p className="text-2xl font-bold text-yellow-600">1</p>
          <p className="text-sm text-gray-600">Under Review</p>
        </div>
        <div className="bg-white p-4 rounded-lg border text-center">
          <p className="text-2xl font-bold text-purple-600">1</p>
          <p className="text-sm text-gray-600">Interview Scheduled</p>
        </div>
        <div className="bg-white p-4 rounded-lg border text-center">
          <p className="text-2xl font-bold text-green-600">1</p>
          <p className="text-sm text-gray-600">Interview Completed</p>
        </div>
        <div className="bg-white p-4 rounded-lg border text-center">
          <p className="text-2xl font-bold text-red-600">1</p>
          <p className="text-sm text-gray-600">Rejected</p>
        </div>
      </div>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      {app.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-navy-800">{app.name}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm ml-1">GPA {app.gpa}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          {app.major}, {app.university}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {app.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Graduates {app.graduationDate}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {app.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {app.phone}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {app.skills.slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {app.skills.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{app.skills.length - 5} more
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>Experience:</strong> {app.experience}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    <Badge className={`${getStatusColor(app.status)} flex items-center space-x-1`}>
                      {getStatusIcon(app.status)}
                      <span>{app.status}</span>
                    </Badge>
                    <p className="text-sm text-gray-500">
                      Applied {new Date(app.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Cover Letter Preview */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium mb-2">Cover Letter:</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{app.coverLetter}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        Resume
                      </a>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {app.status === "New" && (
                      <>
                        <Button size="sm" variant="outline">
                          Move to Review
                        </Button>
                        <Button size="sm">
                          Schedule Interview
                        </Button>
                      </>
                    )}
                    {app.status === "Under Review" && (
                      <>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                        <Button size="sm">
                          Schedule Interview
                        </Button>
                      </>
                    )}
                    {app.status === "Interview Scheduled" && (
                      <>
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm">
                          Join Interview
                        </Button>
                      </>
                    )}
                    {app.status === "Interview Completed" && (
                      <>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Extend Offer
                        </Button>
                      </>
                    )}
                    {app.status === "Rejected" && (
                      <Button size="sm" variant="outline">
                        Reconsider
                      </Button>
                    )}
                  </div>
                </div>

                {/* Interview Details */}
                {app.status === "Interview Scheduled" && app.name === "Emily Johnson" && (
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-800">
                      <strong>Interview Scheduled:</strong> Tomorrow, 2:00 PM - Video call via Zoom
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline">
                        Join Meeting
                      </Button>
                      <Button size="sm" variant="outline">
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                )}

                {/* Interview Feedback */}
                {app.status === "Interview Completed" && app.name === "David Kim" && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 mb-2">
                      <strong>Interview Completed:</strong> January 18, 2024
                    </p>
                    <p className="text-sm text-green-700">
                      Strong technical skills, good communication, fits well with team culture. 
                      Recommended for hire.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}