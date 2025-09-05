'use client'

import { RecruiterNav } from '@/components/layout/recruiter-nav'

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNav />
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}