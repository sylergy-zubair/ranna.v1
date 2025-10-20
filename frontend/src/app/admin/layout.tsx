import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ranna Admin Panel',
  description: 'Admin panel for managing restaurant menu',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {children}
    </div>
  )
}
