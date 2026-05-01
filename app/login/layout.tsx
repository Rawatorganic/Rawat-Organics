import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Internal admin sign-in for Rawat Organics.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
