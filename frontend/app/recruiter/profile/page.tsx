import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Building, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Edit,
  Save,
  Users,
  Briefcase,
  Award,
  Plus
} from "lucide-react"

export default function RecruiterProfile() {
  const companyBenefits = [
    "Health Insurance", "Dental Coverage", "Vision Insurance", 
    "401(k) Matching", "Flexible PTO", "Remote Work Options",
    "Professional Development", "Stock Options", "Gym Membership"
  ]

  const recentHires = [
    {
      name: "Sarah Chen",
      position: "Frontend Developer",
      hiredDate: "Jan 2024",
      university: "UC Berkeley"
    },
    {
      name: "Michael Rodriguez",
      position: "Backend Developer", 
      hiredDate: "Dec 2023",
      university: "Stanford"
    },
    {
      name: "Emily Johnson",
      position: "UI/UX Designer",
      hiredDate: "Nov 2023",
      university: "MIT"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">Company Profile</h1>
          <p className="text-gray-600 mt-1">Manage your company information and recruitment settings</p>
        </div>
        <Button size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="TechCorp" />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Technology" />
                </div>
                <div>
                  <Label htmlFor="companySize">Company Size</Label>
                  <Input id="companySize" defaultValue="500-1000 employees" />
                </div>
                <div>
                  <Label htmlFor="founded">Founded</Label>
                  <Input id="founded" defaultValue="2010" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://techcorp.com" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="location">Headquarters</Label>
                  <Input id="location" defaultValue="San Francisco, CA" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Company Description</Label>
                  <textarea
                    id="description"
                    className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="TechCorp is a leading technology company specializing in innovative software solutions. We're passionate about creating products that make a difference and building a diverse, inclusive team of talented professionals."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recruiter Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Recruiter Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Jane" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Smith" />
                </div>
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" defaultValue="Senior Talent Acquisition Manager" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Human Resources" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jane.smith@techcorp.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="Experienced talent acquisition professional with 8+ years in tech recruitment. Passionate about connecting great talent with innovative companies and building diverse, high-performing teams."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Company Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {companyBenefits.map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{benefit}</span>
                    <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Benefit
              </Button>
            </CardContent>
          </Card>

          {/* Recent Hires */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Recent Hires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentHires.map((hire, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {hire.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold">{hire.name}</p>
                        <p className="text-sm text-gray-600">{hire.position}</p>
                        <p className="text-xs text-gray-500">{hire.university}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">Hired</p>
                      <p className="text-xs text-gray-500">{hire.hiredDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Logo & Quick Info */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-navy-600 to-teal-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                TC
              </div>
              <h2 className="text-xl font-bold text-navy-800">TechCorp</h2>
              <p className="text-gray-600">Technology Company</p>
              <div className="flex items-center justify-center text-sm text-gray-500 mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                San Francisco, CA
              </div>
              <Button className="w-full mt-4" size="sm">
                Upload Logo
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>jane.smith@techcorp.com</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-sm">
                <Globe className="h-4 w-4 mr-2 text-gray-500" />
                <a href="https://techcorp.com" className="text-primary hover:underline">
                  techcorp.com
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Building className="h-4 w-4 mr-2 text-gray-500" />
                <span>500-1000 employees</span>
              </div>
            </CardContent>
          </Card>

          {/* Recruitment Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">24</p>
                <p className="text-sm text-gray-600">Successful Hires</p>
                <p className="text-xs text-gray-500">This year</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">68%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-xs text-gray-500">Above average</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">12</p>
                <p className="text-sm text-gray-600">Avg Days to Hire</p>
                <p className="text-xs text-gray-500">Industry leading</p>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Visibility</span>
                <Badge variant="accent">Public</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-respond</span>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Job Alert Emails</span>
                <Badge className="bg-green-100 text-green-800">On</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Privacy Settings
              </Button>
            </CardContent>
          </Card>

          {/* Premium Features */}
          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">Premium Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-yellow-600" />
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-yellow-600" />
                  Unlimited job posts
                </li>
                <li className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-yellow-600" />
                  Priority support
                </li>
              </ul>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700" size="sm">
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}