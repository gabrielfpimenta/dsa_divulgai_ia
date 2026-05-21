import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-divulgai')

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/cliente')) return NextResponse.next()

  const token = req.cookies.get('session')?.value
  if (!token) return NextResponse.redirect(new URL('/login', req.url))

  try {
    const { payload } = await jwtVerify(token, secret)
    const role = payload.role as string
    if (pathname.startsWith('/admin') && role !== 'admin') return NextResponse.redirect(new URL('/cliente', req.url))
    if (pathname.startsWith('/cliente') && role === 'admin') return NextResponse.redirect(new URL('/admin', req.url))
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = { matcher: ['/admin/:path*', '/cliente/:path*'] }
