import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_ACCESS_SECRET as string

if (!JWT_SECRET) {
  throw new Error('JWT_ACCESS_SECRET environment variable is not defined')
}

const secret = new TextEncoder().encode(JWT_SECRET)

export interface JWTPayload {
  id: string
  email: string
  role: string
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, secret)
  return payload as unknown as JWTPayload
}
