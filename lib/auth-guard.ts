import { NextRequest } from 'next/server'
import { verifyToken, type JWTPayload } from '@/lib/jwt'

/**
 * Verify the admin session cookie on an API route.
 * Returns the decoded payload, or null when missing/invalid.
 */
export async function getAdminFromRequest(req: NextRequest): Promise<JWTPayload | null> {
  const token = req.cookies.get('rawat_admin_token')?.value
  if (!token) return null
  try {
    return await verifyToken(token)
  } catch {
    return null
  }
}
