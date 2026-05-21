import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-divulgai')

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export async function createSession(payload: { id: number; role: 'client' | 'admin'; name: string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)

  ;(await cookies()).set('session', token, { httpOnly: true, sameSite: 'lax', path: '/' })
}

export async function getSession() {
  const token = (await cookies()).get('session')?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as { id: number; role: 'client' | 'admin'; name: string }
  } catch {
    return null
  }
}

export async function clearSession() {
  ;(await cookies()).delete('session')
}
