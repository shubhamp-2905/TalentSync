import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/common/hero-section"
import { FeatureCard } from "@/components/common/feature-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Search, 
  Target, 
  BarChart3, 
  Shield, 
  Zap, 
  Users,
  Star,
  ArrowRight 
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeroSection />

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Why TalentSync Stands Out
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We've engineered a comprehensive platform that streamlines the recruitment process, 
              delivering exceptional results for both emerging talent and established organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={Search}
              title="AI-Powered Matching"
              description="Advanced algorithms analyze skills, experience, and preferences to create precise candidate-opportunity alignments."
            />
            <FeatureCard
              icon={Target}
              title="Precision Recruitment"
              description="Sophisticated filtering and comprehensive candidate profiles enable targeted talent acquisition strategies."
            />
            <FeatureCard
              icon={BarChart3}
              title="Advanced Analytics"
              description="Comprehensive insights into recruitment metrics, market trends, and performance optimization data."
            />
            <FeatureCard
              icon={Shield}
              title="Verified Excellence"
              description="Multi-tier verification process ensures authentic profiles and maintains platform integrity standards."
            />
            <FeatureCard
              icon={Zap}
              title="Real-Time Updates"
              description="Instant notifications and seamless communication channels keep all stakeholders informed and engaged."
            />
            <FeatureCard
              icon={Users}
              title="Professional Network"
              description="Access to an exclusive community of industry professionals and emerging talent leaders."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from professionals who've transformed their careers through TalentSync
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-black text-black" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  "TalentSync's sophisticated matching system connected me with a senior engineering role at a Fortune 500 company. The platform's professionalism and efficiency exceeded my expectations."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">SC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-black">Sarah Chen</p>
                    <p className="text-sm text-gray-600">Senior Software Engineer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-black text-black" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  "As a talent acquisition director, TalentSync has revolutionized our hiring process. The quality of candidates and analytical insights have significantly improved our recruitment ROI."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-black">Michael Rodriguez</p>
                    <p className="text-sm text-gray-600">Director of Talent Acquisition</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-black text-black" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 text-base leading-relaxed">
                  "The platform's intuitive interface and strategic matching capabilities helped me secure a competitive marketing position that perfectly aligns with my career trajectory."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">AJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-black">Alex Johnson</p>
                    <p className="text-sm text-gray-600">Marketing Specialist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Elevate Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who have accelerated their careers through TalentSync's 
            innovative recruitment platform and comprehensive talent network.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 text-lg" asChild>
              <Link href="/register">
                Get Started Today
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-black hover:text-white font-semibold px-8 py-4 text-lg" asChild>
              <Link href="/about">Explore Platform</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}