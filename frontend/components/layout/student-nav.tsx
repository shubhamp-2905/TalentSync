'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, User, LogOut, Briefcase, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the shape of the user data we expect
interface NavUser {
    firstName: string;
    lastName: string;
}

// Update the navigation array to include the new 'Upskill' section
const navigation = [
    {
        name: "Explore Jobs",
        href: "/student/jobs", // This is the new home/main page
        icon: Search,
    },
    {
        name: "Upskill", // The new 'Upskill' section
        href: "/student/upskill",
        icon: Zap, // Using Zap for a cutting-edge, "insane feature" feel
    },
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
];

export function StudentNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<NavUser | null>(null);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Failed to fetch user for nav", error);
            }
        };
        fetchUser();
    }, []);

    // Handle logout functionality
    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    return (
        <div className="flex h-16 items-center px-6 border-b bg-white sticky top-0 z-50 shadow-sm">
            <Link href="/student/jobs" className="flex items-center space-x-2 mr-8">
                {/* Replaced generic div with an icon for better aesthetics */}
                <Zap className="h-6 w-6 text-black" fill="black" />
                <span className="font-bold text-xl text-black">TalentSync</span>
            </Link>
            
            <nav className="flex items-center space-x-6 flex-1">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    // Check if the current path starts with the item's href for active state
                    const isActive = pathname.startsWith(item.href);
                    
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-2 text-sm font-semibold transition-colors rounded-lg px-2 py-1",
                                isActive
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "text-gray-600 hover:text-black hover:bg-gray-50" 
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                    {/* Display user's name dynamically, with a fallback */}
                    {user ? `${user.firstName} ${user.lastName}` : "Student"}
                </span>
                <Button 
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-sm text-gray-500 hover:text-black"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </Button>
            </div>
        </div>
    );
}
