import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FeatureCard } from "@/components/common/feature-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  Target, 
  Zap, 
  Shield,
  TrendingUp,
  Heart,
  Award,
  Globe,
  ArrowRight
} from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-founder",
      bio: "Former VP of Engineering at Google with 15 years in tech leadership.",
      initials: "SJ"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-founder", 
      bio: "Ex-Principal Engineer at Microsoft, passionate about scalable systems.",
      initials: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "Former Product Lead at Airbnb, expert in user experience design.",
      initials: "ER"
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Previously at Tesla, specializes in machine learning and data science.",
      initials: "DK"
    }
  ]

  const values = [
    {
      icon: Heart,
      title: "Student-First Approach",
      description: "We prioritize student success and career growth above all else, ensuring every feature serves their best interests."
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We maintain the highest standards of data privacy and transparent communication between all parties."
    },
    {
      icon: Globe,
      title: "Diversity & Inclusion",
      description: "We champion diversity in tech and actively work to create opportunities for underrepresented groups."
    },
    {
      icon: TrendingUp,
      title: "Continuous Innovation",
      description: "We constantly evolve our platform using cutting-edge technology and user feedback."
    }
  ]

  const stats = [
    { number: "50K+", label: "Students Registered" },
    { number: "2K+", label: "Companies Hiring" },
    { number: "15K+", label: "Successful Matches" },
    { number: "95%", label: "Satisfaction Rate" }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-navy-800 to-navy-600">
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About TalentSync
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            We're on a mission to revolutionize how students and companies connect, 
            making the recruitment process more efficient, fair, and successful for everyone.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-xl leading-relaxed mb-6">
                TalentSync was born out of frustration with the traditional recruitment process. 
                As former students and recruiters ourselves, we experienced firsthand the challenges 
                of finding the right match – students struggling to get noticed by companies, and 
                recruiters spending countless hours sifting through irrelevant applications.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                Founded in 2022 by a team of tech veterans and recent graduates, we set out to 
                create a platform that would level the playing field. Our AI-powered matching 
                system ensures that talented students get the visibility they deserve, while 
                helping companies discover candidates who truly fit their needs.
              </p>
              <p className="text-xl leading-relaxed">
                Today, we're proud to have facilitated thousands of successful matches and 
                continue to innovate in the recruitment technology space. Our commitment remains 
                the same: making career opportunities accessible to all students, regardless of 
                their background or connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-navy-800 mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <FeatureCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a diverse group of passionate individuals united by our mission 
              to transform the recruitment landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-navy-600 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-bold text-navy-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-navy-800">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              "To democratize access to career opportunities by connecting talented students 
              with forward-thinking companies through intelligent technology and human insight."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">
                  Join TalentSync Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-navy-800" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-800 mb-4">
              Awards & Recognition
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-bold mb-2">TechCrunch Startup of the Year</h3>
              <p className="text-gray-600 text-sm">2023</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Best EdTech Innovation</h3>
              <p className="text-gray-600 text-sm">EdTech Awards 2023</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Top 50 HR Tech Companies</h3>
              <p className="text-gray-600 text-sm">HRTech Outlook 2023</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}