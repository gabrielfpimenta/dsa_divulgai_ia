export const runtime = "nodejs";

import Database from "better-sqlite3";

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSession, verifyPassword } from '@/lib/auth'

export async function POST(req: Request) {
  const { email, senha } = await req.json()
  const user = db.prepare('SELECT id,name,role,password_hash FROM users WHERE email = ?').get(email) as any
  if (!user) return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 })
  const ok = await verifyPassword(senha, user.password_hash)
  if (!ok) return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 })
  await createSession({ id: user.id, role: user.role, name: user.name })
  return NextResponse.json({ ok: true, role: user.role })
}
