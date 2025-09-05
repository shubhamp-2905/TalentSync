import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/common/stats-card"
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  BarChart3,
  PieChart,
  Calendar,
  GraduationCap,
  MapPin,
  Star
} from "lucide-react"

export default function RecruiterAnalysis({ params }: { params: { jobId: string } }) {
  // Mock data for analysis
  const jobData = {
    title: "Frontend Developer",
    totalApplications: 45,
    newThisWeek: 12,
    averageResponseTime: "2.3 days",
    conversionRate: "18%"
  }

  const applicationTrend = [
    { week: "Week 1", applications: 8 },
    { week: "Week 2", applications: 15 },
    { week: "Week 3", applications: 22 },
    { week: "Current", applications: 12 }
  ]

  const skillsAnalysis = [
    { skill: "React", count: 38, percentage: 84 },
    { skill: "JavaScript", count: 42, percentage: 93 },
    { skill: "TypeScript", count: 28, percentage: 62 },
    { skill: "Node.js", count: 25, percentage: 56 },
    { skill: "Python", count: 18, percentage: 40 },
    { skill: "CSS", count: 35, percentage: 78 }
  ]

  const universityBreakdown = [
    { university: "UC Berkeley", count: 8, percentage: 18 },
    { university: "Stanford", count: 6, percentage: 13 },
    { university: "MIT", count: 5, percentage: 11 },
    { university: "Carnegie Mellon", count: 4, percentage: 9 },
    { university: "UCLA", count: 3, percentage: 7 },
    { university: "Others", count: 19, percentage: 42 }
  ]

  const gpaDistribution = [
    { range: "3.8 - 4.0", count: 12, percentage: 27 },
    { range: "3.5 - 3.7", count: 18, percentage: 40 },
    { range: "3.0 - 3.4", count: 10, percentage: 22 },
    { range: "Below 3.0", count: 5, percentage: 11 }
  ]

  const applicationStatus = [
    { status: "New", count: 8, color: "bg-blue-100 text-blue-800" },
    { status: "Under Review", count: 15, color: "bg-yellow-100 text-yellow-800" },
    { status: "Interview Scheduled", count: 12, color: "bg-purple-100 text-purple-800" },
    { status: "Interview Completed", count: 6, color: "bg-green-100 text-green-800" },
    { status: "Rejected", count: 4, color: "bg-red-100 text-red-800" }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">Job Analysis: {jobData.title}</h1>
          <p className="text-gray-600 mt-1">Insights and analytics for your job posting</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          icon={Users}
          label="Total Applications"
          value={jobData.totalApplications}
          change={`+${jobData.newThisWeek} this week`}
          changeType="positive"
        />
        <StatsCard
          icon={TrendingUp}
          label="Conversion Rate"
          value={jobData.conversionRate}
          change="+3% vs industry avg"
          changeType="positive"
        />
        <StatsCard
          icon={Clock}
          label="Avg Response Time"
          value={jobData.averageResponseTime}
          change="Better than 70% of jobs"
          changeType="positive"
        />
        <StatsCard
          icon={Target}
          label="Interview Rate"
          value="27%"
          change="+5% from last month"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Application Trend
            </CardTitle>
            <CardDescription>Applications received over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applicationTrend.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.week}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(item.applications / 25) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-8">{item.applications}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Application Status
            </CardTitle>
            <CardDescription>Current status of all applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {applicationStatus.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={item.color}>{item.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(item.count / jobData.totalApplications) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-8">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Analysis</CardTitle>
            <CardDescription>Most common skills among applicants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsAnalysis.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full" 
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-12">{skill.count}</span>
                    <span className="text-xs text-gray-500 w-8">({skill.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* University Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              University Breakdown
            </CardTitle>
            <CardDescription>Top universities of applicants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {universityBreakdown.map((uni, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{uni.university}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-navy-600 h-2 rounded-full" 
                        style={{ width: `${uni.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-8">{uni.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* GPA Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              GPA Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {gpaDistribution.map((gpa, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{gpa.range}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${gpa.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-8">{gpa.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">California</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm font-semibold">29</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">New York</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-sm font-semibold">9</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Texas</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-600 h-2 rounded-full" style={{ width: '11%' }}></div>
                  </div>
                  <span className="text-sm font-semibold">5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Others</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-600 h-2 rounded-full" style={{ width: '4%' }}></div>
                  </div>
                  <span className="text-sm font-semibold">2</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">4.2/5</p>
                <p className="text-sm text-gray-600">Job Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">85%</p>
                <p className="text-sm text-gray-600">Application Completion Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">12</p>
                <p className="text-sm text-gray-600">Avg Days to Hire</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}