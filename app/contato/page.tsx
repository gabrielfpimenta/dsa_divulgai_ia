"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, MessageSquareText, Phone } from "lucide-react"

export default function ContatoPage() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [enviado, setEnviado] = useState(false)
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); setEnviado(true); setNome(""); setEmail(""); setMensagem("") }

  return <div className="flex min-h-screen flex-col"><Header /><main className="flex-1 py-16"><div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2"><Card><CardHeader><CardTitle className="text-3xl">Fale com a gente</CardTitle><CardDescription>Tem dúvidas, sugestões ou precisa de ajuda? Preencha o formulário e nossa equipe retorna em até 1 dia útil.</CardDescription></CardHeader><CardContent><form onSubmit={onSubmit} className="space-y-4"><div><Label htmlFor="nome">Nome</Label><Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required /></div><div><Label htmlFor="email">E-mail</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div><div><Label htmlFor="mensagem">Mensagem</Label><Textarea id="mensagem" value={mensagem} onChange={(e) => setMensagem(e.target.value)} rows={5} required /></div><Button type="submit" className="w-full">Enviar mensagem</Button>{enviado && <p className="text-sm text-green-700">Mensagem enviada com sucesso! Em breve entraremos em contato.</p>}</form></CardContent></Card><Card><CardHeader><CardTitle className="text-2xl">Informações de contato</CardTitle><CardDescription>Você também pode falar com a equipe pelos canais abaixo.</CardDescription></CardHeader><CardContent className="space-y-5 text-sm"><div className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-primary" /><div><p className="font-medium">E-mail</p><p className="text-muted-foreground">contato@divulgai.com.br</p></div></div><div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-primary" /><div><p className="font-medium">Telefone</p><p className="text-muted-foreground">(11) 4002-8922</p></div></div><div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /><div><p className="font-medium">Atendimento</p><p className="text-muted-foreground">Barueri, SP · Segunda a sexta, das 9h às 18h</p></div></div><div className="flex items-start gap-3"><MessageSquareText className="mt-0.5 h-4 w-4 text-primary" /><div><p className="font-medium">Suporte para prestadores</p><p className="text-muted-foreground">suporte@divulgai.com.br</p></div></div></CardContent></Card></div></main><Footer /></div>
}
