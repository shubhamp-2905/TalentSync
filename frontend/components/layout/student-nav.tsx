import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, User, LogOut } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    href: "/student/applications",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/student/profile",
    icon: User,
  },
]

export function StudentNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-16 items-center px-6 border-b bg-white">
      <Link href="/" className="flex items-center space-x-2 mr-8">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-navy-600 to-teal-600"></div>
        <span className="font-bold text-xl text-navy-800">TalentSync</span>
      </Link>
      
      <nav className="flex items-center space-x-6 flex-1">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">John Doe</span>
        <Link 
          href="/login"
          className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  )
}