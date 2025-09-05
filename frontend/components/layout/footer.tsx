import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="font-bold text-xl text-black">TalentSync</span>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-xs">
              Connecting exceptional talent with forward-thinking organizations through intelligent matching technology.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-black">For Professionals</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/student/dashboard" className="text-gray-600 hover:text-black transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/student/applications" className="text-gray-600 hover:text-black transition-colors">
                  Applications
                </Link>
              </li>
              <li>
                <Link href="/student/profile" className="text-gray-600 hover:text-black transition-colors">
                  Profile Management
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-black">For Organizations</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/recruiter/dashboard" className="text-gray-600 hover:text-black transition-colors">
                  Recruiter Dashboard
                </Link>
              </li>
              <li>
                <Link href="/recruiter/profile" className="text-gray-600 hover:text-black transition-colors">
                  Company Profile
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-gray-600 hover:text-black transition-colors">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-black">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2024 TalentSync. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/sitemap" className="text-sm text-gray-600 hover:text-black transition-colors">
                Sitemap
              </Link>
              <Link href="/careers" className="text-sm text-gray-600 hover:text-black transition-colors">
                Careers
              </Link>
              <Link href="/press" className="text-sm text-gray-600 hover:text-black transition-colors">
                Press
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}