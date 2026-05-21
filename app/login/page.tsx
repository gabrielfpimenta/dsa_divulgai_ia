"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro("")
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, senha }) })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) return setErro(data.error || 'Falha no login.')
    router.push(data.role === 'admin' ? '/admin' : '/cliente')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <ChefHat className="mx-auto mb-3 h-10 w-10 text-primary" />
          <CardTitle>Entrar na conta</CardTitle>
          <CardDescription>Use seu e-mail e senha para acessar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label>E-mail</Label><Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></div>
            <div><Label>Senha</Label><Input type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} required /></div>
            {erro && <p className="text-sm text-destructive">{erro}</p>}
            <Button className="w-full" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
          </form>
          <p className="mt-4 text-sm">Não tem conta? <Link className="text-primary" href="/cadastro">Cadastre-se</Link></p>
        </CardContent>
      </Card>
    </div>
  )
}
