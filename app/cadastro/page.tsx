"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ChefHat, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react"

export default function CadastroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  })
  const [aceitaTermos, setAceitaTermos] = useState(false)
  const [loading, setLoading] = useState(false)
  const [erros, setErros] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpa erro do campo ao digitar
    if (erros[name]) {
      setErros(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {}

    if (!formData.nome.trim()) {
      novosErros.nome = "Nome e obrigatorio"
    }

    if (!formData.email.trim()) {
      novosErros.email = "E-mail e obrigatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      novosErros.email = "E-mail invalido"
    }

    if (!formData.telefone.trim()) {
      novosErros.telefone = "Telefone e obrigatorio"
    }

    if (!formData.senha) {
      novosErros.senha = "Senha e obrigatoria"
    } else if (formData.senha.length < 6) {
      novosErros.senha = "Senha deve ter no minimo 6 caracteres"
    }

    if (formData.senha !== formData.confirmarSenha) {
      novosErros.confirmarSenha = "Senhas nao conferem"
    }

    if (!aceitaTermos) {
      novosErros.termos = "Voce deve aceitar os termos de uso"
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validarFormulario()) return

    setLoading(true)
    // Simula chamada de API
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    // Redirecionar para home apos cadastro
    window.location.href = "/"
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image/Brand */}
      <div className="hidden flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/80 lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="max-w-md text-center text-primary-foreground">
          <ChefHat className="mx-auto mb-8 h-24 w-24 opacity-90" />
          <h2 className="mb-4 text-3xl font-bold">
            Junte-se a nossa comunidade
          </h2>
          <p className="text-lg opacity-90">
            Encontre os melhores prestadores de servicos alimenticios 
            da sua regiao. Cadastre-se e comece a descobrir sabores incriveis.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <span className="text-2xl font-bold text-primary-foreground">D</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Divulgai</span>
            </Link>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Criar conta</CardTitle>
              <CardDescription>
                Preencha os dados abaixo para se cadastrar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="nome"
                      name="nome"
                      type="text"
                      placeholder="Seu nome"
                      className={`pl-10 ${erros.nome ? "border-destructive" : ""}`}
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </div>
                  {erros.nome && <p className="text-xs text-destructive">{erros.nome}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      className={`pl-10 ${erros.email ? "border-destructive" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {erros.email && <p className="text-xs text-destructive">{erros.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="telefone"
                      name="telefone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className={`pl-10 ${erros.telefone ? "border-destructive" : ""}`}
                      value={formData.telefone}
                      onChange={handleChange}
                    />
                  </div>
                  {erros.telefone && <p className="text-xs text-destructive">{erros.telefone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="senha"
                      name="senha"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimo 6 caracteres"
                      className={`pl-10 pr-10 ${erros.senha ? "border-destructive" : ""}`}
                      value={formData.senha}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {erros.senha && <p className="text-xs text-destructive">{erros.senha}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha">Confirmar senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type={showPassword ? "text" : "password"}
                      placeholder="Repita a senha"
                      className={`pl-10 ${erros.confirmarSenha ? "border-destructive" : ""}`}
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                    />
                  </div>
                  {erros.confirmarSenha && <p className="text-xs text-destructive">{erros.confirmarSenha}</p>}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="termos" 
                    checked={aceitaTermos}
                    onCheckedChange={(checked) => {
                      setAceitaTermos(checked === true)
                      if (erros.termos) setErros(prev => ({ ...prev, termos: "" }))
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor="termos" 
                      className={`text-sm font-normal cursor-pointer ${erros.termos ? "text-destructive" : ""}`}
                    >
                      Li e aceito os{" "}
                      <Link href="/termos" className="text-primary hover:underline">Termos de Uso</Link>
                      {" "}e{" "}
                      <Link href="/privacidade" className="text-primary hover:underline">Politica de Privacidade</Link>
                    </Label>
                  </div>
                </div>
                {erros.termos && <p className="text-xs text-destructive">{erros.termos}</p>}

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Criando conta..." : "Criar conta"}
                </Button>
              </form>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  ou cadastre-se com
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Ja tem uma conta?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Faca login
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
