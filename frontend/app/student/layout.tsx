'use client'

import { StudentNav } from '@/components/layout/student-nav'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNav />
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}