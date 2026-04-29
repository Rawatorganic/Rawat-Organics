import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PROTECTED = ['/admin']
const PUBLIC_PREFIXES = ['/api', '/login', '/contact', '/_next', '/favicon']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(p + '/'))
  if (!isProtected) return NextResponse.next()

  const token = req.cookies.get('rawat_admin_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET as string)
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    const response = NextResponse.redirect(new URL('/login', req.url))
    response.cookies.delete('rawat_admin_token')
    return response
  }
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
