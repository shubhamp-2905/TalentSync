import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/common/stats-card"
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock,
  Plus,
  Eye,
  MessageCircle,
  Calendar,
  Star,
  MapPin
} from "lucide-react"

export default function RecruiterDashboard() {
  const recentApplications = [
    {
      id: 1,
      name: "Sarah Chen",
      position: "Frontend Developer",
      university: "UC Berkeley",
      gpa: "3.9",
      appliedDate: "2 hours ago",
      status: "New",
      skills: ["React", "TypeScript", "Node.js"]
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      position: "Backend Developer",
      university: "Stanford University",
      gpa: "3.7",
      appliedDate: "4 hours ago",
      status: "New",
      skills: ["Python", "Django", "PostgreSQL"]
    },
    {
      id: 3,
      name: "Emily Johnson",
      position: "UI/UX Designer",
      university: "MIT",
      gpa: "3.8",
      appliedDate: "1 day ago",
      status: "Reviewed",
      skills: ["Figma", "Sketch", "Prototyping"]
    },
    {
      id: 4,
      name: "David Kim",
      position: "Data Scientist",
      university: "Carnegie Mellon",
      gpa: "3.9",
      appliedDate: "2 days ago",
      status: "Interview Scheduled",
      skills: ["Python", "Machine Learning", "SQL"]
    }
  ]

  const activeJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      applications: 45,
      newApplications: 12,
      location: "San Francisco, CA",
      type: "Full-time",
      postedDate: "2 weeks ago"
    },
    {
      id: 2,
      title: "Backend Developer",
      applications: 38,
      newApplications: 8,
      location: "Remote",
      type: "Full-time",
      postedDate: "1 week ago"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      applications: 29,
      newApplications: 5,
      location: "New York, NY",
      type: "Full-time",
      postedDate: "3 days ago"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">Welcome back, TechCorp!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your recruitment</p>
        </div>
        <Button asChild>
          <Link href="/recruiter/post-job" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          icon={Users}
          label="Total Applications"
          value={247}
          change="+18 this week"
          changeType="positive"
        />
        <StatsCard
          icon={Briefcase}
          label="Active Job Posts"
          value={8}
          change="2 expiring soon"
          changeType="neutral"
        />
        <StatsCard
          icon={Calendar}
          label="Interviews Scheduled"
          value={12}
          change="+5 this week"
          changeType="positive"
        />
        <StatsCard
          icon={TrendingUp}
          label="Hire Rate"
          value="68%"
          change="+12% vs last month"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>New candidate applications across all positions</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/recruiter/applications">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                        {app.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{app.name}</h3>
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-xs ml-1">GPA {app.gpa}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{app.university}</p>
                        <p className="text-sm text-gray-500">Applied for {app.position}</p>
                        <div className="flex space-x-1 mt-1">
                          {app.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={
                          app.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          app.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }
                      >
                        {app.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{app.appliedDate}</p>
                      <div className="flex space-x-1 mt-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Active Job Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Active Job Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div key={job.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-sm">{job.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </div>
                        <p className="text-xs text-gray-500">{job.type} • {job.postedDate}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {job.applications} apps
                      </Badge>
                    </div>
                    {job.newApplications > 0 && (
                      <div className="mt-2">
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          +{job.newApplications} new
                        </Badge>
                      </div>
                    )}
                    <Button size="sm" variant="outline" className="w-full mt-2" asChild>
                      <Link href={`/recruiter/applications/${job.id}`}>
                        View Applications
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/recruiter/post-job">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/recruiter/search">
                  <Users className="h-4 w-4 mr-2" />
                  Search Candidates
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/recruiter/analytics">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/recruiter/calendar">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Today's Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-sm">David Kim</p>
                  <p className="text-xs text-gray-600">Data Scientist • 2:00 PM</p>
                  <p className="text-xs text-gray-500">Video call via Zoom</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-sm">Alex Johnson</p>
                  <p className="text-xs text-gray-600">Frontend Developer • 4:30 PM</p>
                  <p className="text-xs text-gray-500">Phone interview</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>This Month's Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Applications Received</span>
                <span className="font-semibold">156</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Candidates Interviewed</span>
                <span className="font-semibold">28</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Offers Extended</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Hires Made</span>
                <span className="font-semibold text-green-600">8</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}