import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="container flex h-20 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-8 flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-2xl text-black">TalentSync</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-base font-medium flex-1">
          <Link
            href="/about"
            className="transition-colors hover:text-black text-gray-600 font-medium"
          >
            About
          </Link>
          <Link
            href="/jobs"
            className="transition-colors hover:text-black text-gray-600 font-medium"
          >
            Opportunities
          </Link>
          <Link
            href="/companies"
            className="transition-colors hover:text-black text-gray-600 font-medium"
          >
            Companies
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black font-medium" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" className="bg-black text-white hover:bg-gray-800 font-medium px-6" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="md:hidden ml-2">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}