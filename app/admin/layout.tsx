import type { Metadata } from 'next'
import AdminShell from './components/AdminShell'

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Rawat Organics admin dashboard.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
