import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from "lucide-react"

export default function StudentApplications() {
  const applications = [
    {
      id: 1,
      company: "TechCorp",
      logo: "TC",
      position: "Frontend Developer Intern",
      location: "San Francisco, CA",
      type: "Internship",
      appliedDate: "2024-01-15",
      status: "Interview Scheduled",
      statusColor: "bg-blue-100 text-blue-800",
      salary: "$50,000 - $70,000"
    },
    {
      id: 2,
      company: "StartupXYZ",
      logo: "SX",
      position: "Full Stack Developer",
      location: "Remote",
      type: "Full-time",
      appliedDate: "2024-01-12",
      status: "Under Review",
      statusColor: "bg-yellow-100 text-yellow-800",
      salary: "$80,000 - $100,000"
    },
    {
      id: 3,
      company: "MegaCorp",
      logo: "MC",
      position: "Software Engineer",
      location: "New York, NY",
      type: "Full-time",
      appliedDate: "2024-01-08",
      status: "Application Submitted",
      statusColor: "bg-gray-100 text-gray-800",
      salary: "$90,000 - $120,000"
    },
    {
      id: 4,
      company: "InnovateLab",
      logo: "IL",
      position: "UI/UX Designer",
      location: "Austin, TX",
      type: "Full-time",
      appliedDate: "2024-01-05",
      status: "Interview Completed",
      statusColor: "bg-green-100 text-green-800",
      salary: "$70,000 - $90,000"
    },
    {
      id: 5,
      company: "CloudTech",
      logo: "CT",
      position: "DevOps Engineer",
      location: "Seattle, WA",
      type: "Full-time",
      appliedDate: "2024-01-01",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800",
      salary: "$95,000 - $130,000"
    },
    {
      id: 6,
      company: "DataCorp",
      logo: "DC",
      position: "Data Science Intern",
      location: "Chicago, IL",
      type: "Internship",
      appliedDate: "2023-12-28",
      status: "Offer Received",
      statusColor: "bg-green-100 text-green-800",
      salary: "$45,000 - $60,000"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Interview Scheduled":
        return <Calendar className="h-4 w-4" />
      case "Under Review":
        return <Clock className="h-4 w-4" />
      case "Interview Completed":
        return <CheckCircle className="h-4 w-4" />
      case "Offer Received":
        return <CheckCircle className="h-4 w-4" />
      case "Rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">My Applications</h1>
          <p className="text-gray-600 mt-1">Track and manage your job applications</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search applications..."
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-2xl font-bold text-navy-800">12</p>
          <p className="text-sm text-gray-600">Total Applications</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-2xl font-bold text-yellow-600">5</p>
          <p className="text-sm text-gray-600">Under Review</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-2xl font-bold text-green-600">3</p>
          <p className="text-sm text-gray-600">Interviews</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-2xl font-bold text-blue-600">1</p>
          <p className="text-sm text-gray-600">Offers Received</p>
        </div>
      </div>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {app.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-navy-800">{app.position}</h3>
                      <p className="text-gray-600 font-medium">{app.company}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {app.location}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {app.type}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Applied {new Date(app.appliedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{app.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={`${app.statusColor} flex items-center space-x-1`}>
                      {getStatusIcon(app.status)}
                      <span>{app.status}</span>
                    </Badge>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
                
                {app.status === "Interview Scheduled" && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Next Interview:</strong> Tomorrow, 2:00 PM - Video call via Zoom
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline">
                        Join Meeting
                      </Button>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                )}

                {app.status === "Offer Received" && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      <strong>Congratulations!</strong> You received an offer. Response deadline: January 30, 2024
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Accept Offer
                      </Button>
                      <Button size="sm" variant="outline">
                        Negotiate
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
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