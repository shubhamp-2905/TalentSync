import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Briefcase, TrendingUp, CheckCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-16 pb-32 lg:pt-20 lg:pb-40 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-black font-medium text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Trusted by 10,000+ Professionals
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-black">
            Where Talent Meets
            <span className="block mt-2">Opportunity</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-600 leading-relaxed max-w-4xl mx-auto">
            TalentSync is a cutting-edge recruitment platform that leverages advanced AI technology 
            to create meaningful connections between exceptional talent and innovative organizations. 
            Our mission is to revolutionize how careers are built and how companies discover their next great hire.
          </p>

          <div className="mb-16">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 font-semibold px-8 py-4 text-lg rounded-full" asChild>
                <Link href="/register?type=student" className="flex items-center">
                  Join as Talent
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white font-semibold px-8 py-4 text-lg rounded-full" asChild>
                <Link href="/register?type=recruiter" className="flex items-center">
                  Hire Talent
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-gray-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">10,000+</h3>
              <p className="text-gray-600 font-medium">Verified Professionals</p>
              <p className="text-sm text-gray-500 mt-1">Top-tier talent across industries</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-6">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">500+</h3>
              <p className="text-gray-600 font-medium">Partner Companies</p>
              <p className="text-sm text-gray-500 mt-1">From startups to Fortune 500</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">95%</h3>
              <p className="text-gray-600 font-medium">Success Rate</p>
              <p className="text-sm text-gray-500 mt-1">Successful placements within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}