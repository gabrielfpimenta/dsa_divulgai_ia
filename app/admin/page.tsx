"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  ChefHat, 
  Users, 
  Star, 
  TrendingUp,
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Ban,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
  AlertTriangle,
  Clock
} from "lucide-react"

// Dados mockados
const estatisticas = {
  totalPrestadores: 523,
  prestadoresPendentes: 12,
  totalUsuarios: 10847,
  avaliaçõesHoje: 34,
  ocorrenciasAbertas: 8,
}

const prestadoresPendentes = [
  { id: 1, nome: "Pizzaria do Marcos", categoria: "Lanches", cidade: "Barueri, SP", dataCadastro: "20/01/2026", status: "pendente" },
  { id: 2, nome: "Doces Artesanais Lu", categoria: "Bolos e Doces", cidade: "Osasco, SP", dataCadastro: "19/01/2026", status: "pendente" },
  { id: 3, nome: "Marmitas Caseiras", categoria: "Marmitas", cidade: "Carapicuiba, SP", dataCadastro: "18/01/2026", status: "pendente" },
]

const usuariosRecentes = [
  { id: 1, nome: "Ana Paula Silva", email: "ana@email.com", dataCadastro: "21/01/2026", status: "ativo" },
  { id: 2, nome: "Carlos Eduardo", email: "carlos@email.com", dataCadastro: "20/01/2026", status: "ativo" },
  { id: 3, nome: "Maria Santos", email: "maria@email.com", dataCadastro: "19/01/2026", status: "ativo" },
  { id: 4, nome: "Roberto Lima", email: "roberto@email.com", dataCadastro: "18/01/2026", status: "bloqueado" },
]

const avaliaçõesRecentes = [
  { id: 1, prestador: "Doces da Maria", usuario: "Ana Paula", nota: 5, comentario: "Excelente qualidade!", data: "21/01/2026", status: "aprovada" },
  { id: 2, prestador: "Marmitas Fit", usuario: "Carlos", nota: 4, comentario: "Bom custo-beneficio", data: "21/01/2026", status: "aprovada" },
  { id: 3, prestador: "Salgados da Ana", usuario: "Maria", nota: 2, comentario: "Entrega atrasada", data: "20/01/2026", status: "pendente" },
]

const ocorrencias = [
  { id: 1, tipo: "Reclamação", prestador: "Lanches do Ze", usuario: "Pedro Santos", descricao: "Produto entregue diferente do pedido", data: "21/01/2026", status: "aberta" },
  { id: 2, tipo: "Denuncia", prestador: "Cafe Artesanal", usuario: "Julia Mendes", descricao: "Suspeita de perfil falso", data: "20/01/2026", status: "em analise" },
]

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [buscaPrestador, setBuscaPrestador] = useState("")
  const [buscaUsuario, setBuscaUsuario] = useState("")

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-primary-foreground">D</span>
        </div>
        <span className="font-bold text-sidebar-foreground">Divulgai Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        <button
          onClick={() => { setActiveTab("dashboard"); setSidebarOpen(false) }}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
            activeTab === "dashboard" 
              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Dashboard
        </button>
        <button
          onClick={() => { setActiveTab("prestadores"); setSidebarOpen(false) }}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
            activeTab === "prestadores" 
              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          }`}
        >
          <ChefHat className="h-4 w-4" />
          Prestadores
          {estatisticas.prestadoresPendentes > 0 && (
            <Badge variant="secondary" className="ml-auto">{estatisticas.prestadoresPendentes}</Badge>
          )}
        </button>
        <button
          onClick={() => { setActiveTab("usuarios"); setSidebarOpen(false) }}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
            activeTab === "usuarios" 
              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          }`}
        >
          <Users className="h-4 w-4" />
          Usuarios
        </button>
        <button
          onClick={() => { setActiveTab("avaliações"); setSidebarOpen(false) }}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
            activeTab === "avaliações" 
              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          Avaliacoes
        </button>
        <button
          onClick={() => { setActiveTab("ocorrencias"); setSidebarOpen(false) }}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
            activeTab === "ocorrencias" 
              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          Ocorrencias
          {estatisticas.ocorrenciasAbertas > 0 && (
            <Badge variant="destructive" className="ml-auto">{estatisticas.ocorrenciasAbertas}</Badge>
          )}
        </button>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        <Link
          href="/"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <Home className="h-4 w-4" />
          Ir para o site
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
          <Settings className="h-4 w-4" />
          Configurações
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button 
              className="rounded-lg p-2 hover:bg-muted lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-foreground capitalize">
              {activeTab === "dashboard" ? "Dashboard" : activeTab}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <ChefHat className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{estatisticas.totalPrestadores}</p>
                      <p className="text-sm text-muted-foreground">Prestadores</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{estatisticas.totalUsuarios.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Usuarios</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{estatisticas.prestadoresPendentes}</p>
                      <p className="text-sm text-muted-foreground">Pendentes</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                      <Star className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{estatisticas.avaliaçõesHoje}</p>
                      <p className="text-sm text-muted-foreground">Avaliacoes hoje</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Prestadores Pendentes</CardTitle>
                    <CardDescription>Aguardando aprovacao</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prestadoresPendentes.slice(0, 3).map((prestador) => (
                        <div key={prestador.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <ChefHat className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{prestador.nome}</p>
                              <p className="text-xs text-muted-foreground">{prestador.categoria} - {prestador.cidade}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-500/10">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-4 w-full" onClick={() => setActiveTab("prestadores")}>
                      Ver todos
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ocorrencias Recentes</CardTitle>
                    <CardDescription>Reclamacoes e denuncias</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {ocorrencias.map((ocorrencia) => (
                        <div key={ocorrencia.id} className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                              ocorrencia.tipo === "Denuncia" ? "bg-destructive/10" : "bg-amber-500/10"
                            }`}>
                              <AlertTriangle className={`h-5 w-5 ${
                                ocorrencia.tipo === "Denuncia" ? "text-destructive" : "text-amber-500"
                              }`} />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{ocorrencia.prestador}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">{ocorrencia.descricao}</p>
                            </div>
                          </div>
                          <Badge variant={ocorrencia.status === "aberta" ? "destructive" : "secondary"}>
                            {ocorrencia.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-4 w-full" onClick={() => setActiveTab("ocorrencias")}>
                      Ver todas
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "prestadores" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 sm:max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar prestador..." 
                    className="pl-10"
                    value={buscaPrestador}
                    onChange={(e) => setBuscaPrestador(e.target.value)}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Prestadores Pendentes</CardTitle>
                  <CardDescription>Cadastros aguardando aprovacao</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prestador</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Cidade</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Acoes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prestadoresPendentes.map((prestador) => (
                        <TableRow key={prestador.id}>
                          <TableCell className="font-medium">{prestador.nome}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{prestador.categoria}</Badge>
                          </TableCell>
                          <TableCell>{prestador.cidade}</TableCell>
                          <TableCell>{prestador.dataCadastro}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Aprovar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Rejeitar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "usuarios" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 sm:max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar usuario..." 
                    className="pl-10"
                    value={buscaUsuario}
                    onChange={(e) => setBuscaUsuario(e.target.value)}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usuarios Cadastrados</CardTitle>
                  <CardDescription>Gerenciamento de usuarios da plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Data Cadastro</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acoes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usuariosRecentes.map((usuario) => (
                        <TableRow key={usuario.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {usuario.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{usuario.nome}</span>
                            </div>
                          </TableCell>
                          <TableCell>{usuario.email}</TableCell>
                          <TableCell>{usuario.dataCadastro}</TableCell>
                          <TableCell>
                            <Badge variant={usuario.status === "ativo" ? "default" : "destructive"}>
                              {usuario.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver perfil
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Ban className="mr-2 h-4 w-4" />
                                  {usuario.status === "ativo" ? "Bloquear" : "Desbloquear"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "avaliações" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avaliacoes Recentes</CardTitle>
                  <CardDescription>Moderacao de feedbacks dos usuarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prestador</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Nota</TableHead>
                        <TableHead>Comentario</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acoes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {avaliaçõesRecentes.map((avaliacao) => (
                        <TableRow key={avaliacao.id}>
                          <TableCell className="font-medium">{avaliacao.prestador}</TableCell>
                          <TableCell>{avaliacao.usuario}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              {avaliacao.nota}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">{avaliacao.comentario}</TableCell>
                          <TableCell>
                            <Badge variant={avaliacao.status === "aprovada" ? "default" : "secondary"}>
                              {avaliacao.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver completo
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Aprovar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Remover
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "ocorrencias" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ocorrencias</CardTitle>
                  <CardDescription>Reclamacoes e denuncias dos usuarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Prestador</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Descricao</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acoes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ocorrencias.map((ocorrencia) => (
                        <TableRow key={ocorrencia.id}>
                          <TableCell>
                            <Badge variant={ocorrencia.tipo === "Denuncia" ? "destructive" : "secondary"}>
                              {ocorrencia.tipo}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{ocorrencia.prestador}</TableCell>
                          <TableCell>{ocorrencia.usuario}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{ocorrencia.descricao}</TableCell>
                          <TableCell>{ocorrencia.data}</TableCell>
                          <TableCell>
                            <Badge variant={ocorrencia.status === "aberta" ? "destructive" : "secondary"}>
                              {ocorrencia.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Resolver
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Ban className="mr-2 h-4 w-4" />
                                  Bloquear prestador
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
