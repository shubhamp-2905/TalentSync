import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/common/stats-card"
import { 
  FileText, 
  Briefcase, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Plus,
  ExternalLink,
  Calendar 
} from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">Welcome back, John!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your applications</p>
        </div>
        <Button asChild>
          <Link href="/jobs" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Apply to Jobs
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          icon={FileText}
          label="Applications Submitted"
          value={12}
          change="+3 this week"
          changeType="positive"
        />
        <StatsCard
          icon={Clock}
          label="Under Review"
          value={5}
          change="2 updated"
          changeType="neutral"
        />
        <StatsCard
          icon={CheckCircle}
          label="Interviews Scheduled"
          value={2}
          change="+1 new"
          changeType="positive"
        />
        <StatsCard
          icon={TrendingUp}
          label="Profile Views"
          value={48}
          change="+12% this month"
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
                  <CardDescription>Track your latest job applications</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/student/applications">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    company: "TechCorp",
                    position: "Frontend Developer Intern",
                    status: "Interview Scheduled",
                    date: "2 days ago",
                    statusColor: "bg-blue-100 text-blue-800"
                  },
                  {
                    company: "StartupXYZ",
                    position: "Full Stack Developer",
                    status: "Under Review",
                    date: "5 days ago",
                    statusColor: "bg-yellow-100 text-yellow-800"
                  },
                  {
                    company: "MegaCorp",
                    position: "Software Engineer",
                    status: "Application Submitted",
                    date: "1 week ago",
                    statusColor: "bg-gray-100 text-gray-800"
                  },
                  {
                    company: "InnovateLab",
                    position: "UI/UX Designer",
                    status: "Rejected",
                    date: "2 weeks ago",
                    statusColor: "bg-red-100 text-red-800"
                  }
                ].map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-teal-600 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{app.position}</p>
                        <p className="text-sm text-gray-600">{app.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={app.statusColor}>{app.status}</Badge>
                      <p className="text-sm text-gray-500 mt-1">{app.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-sm">TechCorp Interview</p>
                  <p className="text-sm text-gray-600">Tomorrow, 2:00 PM</p>
                  <p className="text-xs text-gray-500">Video call via Zoom</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-sm">StartupXYZ Call</p>
                  <p className="text-sm text-gray-600">Friday, 10:00 AM</p>
                  <p className="text-xs text-gray-500">Phone interview</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>Complete your profile to attract more recruiters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Profile Progress</span>
                  <span className="font-semibold">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Basic info completed
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Skills added
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    Portfolio missing
                  </div>
                </div>
                <Button size="sm" className="w-full" asChild>
                  <Link href="/student/profile">Complete Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-sm">React Developer</p>
                  <p className="text-sm text-gray-600">WebTech Solutions</p>
                  <p className="text-xs text-gray-500">Remote • Full-time</p>
                  <Button size="sm" variant="outline" className="w-full mt-2">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    View Job
                  </Button>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold text-sm">Frontend Intern</p>
                  <p className="text-sm text-gray-600">DesignStudio</p>
                  <p className="text-xs text-gray-500">On-site • Internship</p>
                  <Button size="sm" variant="outline" className="w-full mt-2">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    View Job
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}