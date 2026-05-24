export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSession, hashPassword } from '@/lib/auth'

export async function POST(req: Request) {
  const body = await req.json()
  const { nome, email, telefone, senha } = body
  if (!nome || !email || !senha) return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (exists) return NextResponse.json({ error: 'E-mail já cadastrado.' }, { status: 409 })
  const hash = await hashPassword(senha)
  const info = db.prepare('INSERT INTO users (name,email,phone,password_hash,role) VALUES (?,?,?,?,?)').run(nome, email, telefone || '', hash, 'client')
  await createSession({ id: Number(info.lastInsertRowid), role: 'client', name: nome })
  return NextResponse.json({ ok: true })
}
