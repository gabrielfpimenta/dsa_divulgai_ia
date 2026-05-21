"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CadastroPage() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nome, email, telefone, senha }) })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) return setErro(data.error || 'Falha no cadastro.')
    router.push('/cliente')
    router.refresh()
  }

  return <div className="flex min-h-screen items-center justify-center px-4"><Card className="w-full max-w-md"><CardHeader><CardTitle>Criar conta</CardTitle><CardDescription>Cadastre-se para pedir e acompanhar serviços.</CardDescription></CardHeader><CardContent><form className="space-y-4" onSubmit={onSubmit}><div><Label>Nome</Label><Input value={nome} onChange={(e)=>setNome(e.target.value)} required /></div><div><Label>E-mail</Label><Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></div><div><Label>Telefone</Label><Input value={telefone} onChange={(e)=>setTelefone(e.target.value)} /></div><div><Label>Senha</Label><Input type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} required minLength={6} /></div>{erro && <p className="text-sm text-destructive">{erro}</p>}<Button className="w-full" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Button></form><p className="mt-4 text-sm">Já possui conta? <Link className="text-primary" href="/login">Entrar</Link></p></CardContent></Card></div>
}
