"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Search, 
  MapPin, 
  Star, 
  ChefHat, 
  Filter,
  SlidersHorizontal,
  X,
  Cake,
  Sandwich,
  Utensils,
  Pizza,
  Coffee,
  Heart
} from "lucide-react"

const categorias = [
  { id: "bolos", nome: "Bolos e Doces", icone: Cake },
  { id: "salgados", nome: "Salgados", icone: Sandwich },
  { id: "marmitas", nome: "Marmitas", icone: Utensils },
  { id: "lanches", nome: "Lanches", icone: Pizza },
  { id: "bebidas", nome: "Cafe e Bebidas", icone: Coffee },
  { id: "fitness", nome: "Fitness", icone: Heart },
]

const cidades = [
  "Todas as cidades",
  "Barueri, SP",
  "Osasco, SP",
  "Carapicuiba, SP",
  "Jandira, SP",
  "Itapevi, SP",
  "Santana de Parnaiba, SP",
]

const prestadores = [
  {
    id: 1,
    nome: "Doces da Maria",
    categoria: "Bolos e Doces",
    categoriaId: "bolos",
    avaliacao: 4.9,
    totalAvaliacoes: 127,
    cidade: "Barueri, SP",
    descricao: "Bolos decorados, cupcakes e doces finos para festas e eventos especiais. Trabalhamos com encomendas personalizadas.",
    especialidades: ["Bolos Decorados", "Cupcakes", "Doces Finos"],
    verificado: true,
  },
  {
    id: 2,
    nome: "Marmitas Fit do Joao",
    categoria: "Marmitas",
    categoriaId: "marmitas",
    avaliacao: 4.8,
    totalAvaliacoes: 89,
    cidade: "Osasco, SP",
    descricao: "Refeicoes saudaveis e equilibradas entregues na sua casa. Cardapio variado com opcoes low carb e veganas.",
    especialidades: ["Low Carb", "Proteico", "Vegano"],
    verificado: true,
  },
  {
    id: 3,
    nome: "Salgados da Dona Ana",
    categoria: "Salgados",
    categoriaId: "salgados",
    avaliacao: 4.7,
    totalAvaliacoes: 203,
    cidade: "Barueri, SP",
    descricao: "Salgados fresquinhos para festas, reunioes e eventos corporativos. Mais de 20 anos de experiencia.",
    especialidades: ["Coxinha", "Esfiha", "Empadas"],
    verificado: true,
  },
  {
    id: 4,
    nome: "Cafe Artesanal do Pedro",
    categoria: "Cafe e Bebidas",
    categoriaId: "bebidas",
    avaliacao: 4.6,
    totalAvaliacoes: 67,
    cidade: "Carapicuiba, SP",
    descricao: "Cafes especiais torrados artesanalmente. Graos selecionados de pequenos produtores brasileiros.",
    especialidades: ["Cafe Especial", "Graos Torrados", "Cold Brew"],
    verificado: false,
  },
  {
    id: 5,
    nome: "Lanches do Ze",
    categoria: "Lanches",
    categoriaId: "lanches",
    avaliacao: 4.5,
    totalAvaliacoes: 156,
    cidade: "Jandira, SP",
    descricao: "Hamburgeres artesanais e lanches especiais. Carnes selecionadas e paes feitos na hora.",
    especialidades: ["Hamburguer", "Hot Dog", "Batata Frita"],
    verificado: true,
  },
  {
    id: 6,
    nome: "Fit Foods Camila",
    categoria: "Fitness",
    categoriaId: "fitness",
    avaliacao: 4.9,
    totalAvaliacoes: 94,
    cidade: "Barueri, SP",
    descricao: "Alimentacao saudavel sem abrir mao do sabor. Marmitas fitness, lanches proteicos e sobremesas fit.",
    especialidades: ["Marmitas Fit", "Lanches Proteicos", "Sobremesas Fit"],
    verificado: true,
  },
  {
    id: 7,
    nome: "Pizzas da Nonna",
    categoria: "Lanches",
    categoriaId: "lanches",
    avaliacao: 4.8,
    totalAvaliacoes: 178,
    cidade: "Osasco, SP",
    descricao: "Pizzas artesanais com receita italiana tradicional. Massa fermentada por 48 horas.",
    especialidades: ["Pizza Napolitana", "Calzone", "Focaccia"],
    verificado: true,
  },
  {
    id: 8,
    nome: "Bolos da Vovo Lucia",
    categoria: "Bolos e Doces",
    categoriaId: "bolos",
    avaliacao: 4.7,
    totalAvaliacoes: 112,
    cidade: "Santana de Parnaiba, SP",
    descricao: "Bolos caseiros com receitas tradicionais de familia. Sabor de casa em cada fatia.",
    especialidades: ["Bolo de Cenoura", "Bolo de Chocolate", "Bolo de Milho"],
    verificado: false,
  },
]

export default function CatalogoPage() {
  const [busca, setbusca] = useState("")
  const [cidadeSelecionada, setCidadeSelecionada] = useState("Todas as cidades")
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([])
  const [apenasVerificados, setApenasVerificados] = useState(false)
  const [ordenacao, setOrdenacao] = useState("relevancia")

  const toggleCategoria = (categoriaId: string) => {
    setCategoriasSelecionadas(prev => 
      prev.includes(categoriaId) 
        ? prev.filter(c => c !== categoriaId)
        : [...prev, categoriaId]
    )
  }

  const limparFiltros = () => {
    setCategoriasSelecionadas([])
    setApenasVerificados(false)
    setCidadeSelecionada("Todas as cidades")
    setbusca("")
  }

  const prestadoresFiltrados = prestadores.filter(p => {
    const matchBusca = busca === "" || 
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      p.especialidades.some(e => e.toLowerCase().includes(busca.toLowerCase()))
    
    const matchCidade = cidadeSelecionada === "Todas as cidades" || p.cidade === cidadeSelecionada
    
    const matchCategoria = categoriasSelecionadas.length === 0 || 
      categoriasSelecionadas.includes(p.categoriaId)
    
    const matchVerificado = !apenasVerificados || p.verificado

    return matchBusca && matchCidade && matchCategoria && matchVerificado
  }).sort((a, b) => {
    switch (ordenacao) {
      case "avaliacao":
        return b.avaliacao - a.avaliacao
      case "avaliacoes":
        return b.totalAvaliacoes - a.totalAvaliacoes
      case "nome":
        return a.nome.localeCompare(b.nome)
      default:
        return b.avaliacao * b.totalAvaliacoes - a.avaliacao * a.totalAvaliacoes
    }
  })

  const temFiltrosAtivos = categoriasSelecionadas.length > 0 || apenasVerificados || cidadeSelecionada !== "Todas as cidades"

  const FiltrosContent = () => (
    <div className="space-y-6">
      {/* Cidade */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Cidade</Label>
        <Select value={cidadeSelecionada} onValueChange={setCidadeSelecionada}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma cidade" />
          </SelectTrigger>
          <SelectContent>
            {cidades.map(cidade => (
              <SelectItem key={cidade} value={cidade}>{cidade}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categorias */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Categorias</Label>
        <div className="space-y-2">
          {categorias.map(cat => (
            <div key={cat.id} className="flex items-center space-x-2">
              <Checkbox 
                id={cat.id} 
                checked={categoriasSelecionadas.includes(cat.id)}
                onCheckedChange={() => toggleCategoria(cat.id)}
              />
              <Label htmlFor={cat.id} className="text-sm font-normal cursor-pointer flex items-center gap-2">
                <cat.icone className="h-4 w-4 text-muted-foreground" />
                {cat.nome}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Verificados */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Outros filtros</Label>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="verificados" 
            checked={apenasVerificados}
            onCheckedChange={(checked) => setApenasVerificados(checked === true)}
          />
          <Label htmlFor="verificados" className="text-sm font-normal cursor-pointer">
            Apenas verificados
          </Label>
        </div>
      </div>

      {/* Limpar filtros */}
      {temFiltrosAtivos && (
        <Button variant="outline" onClick={limparFiltros} className="w-full">
          <X className="mr-2 h-4 w-4" />
          Limpar filtros
        </Button>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Search Header */}
        <section className="border-b border-border bg-card py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Explorar Prestadores</h1>
                <p className="text-muted-foreground">
                  {prestadoresFiltrados.length} prestadores encontrados
                </p>
              </div>
              
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar por nome, produto..." 
                    className="pl-10"
                    value={busca}
                    onChange={(e) => setbusca(e.target.value)}
                  />
                </div>
                
                <Select value={ordenacao} onValueChange={setOrdenacao}>
                  <SelectTrigger className="w-full sm:w-44">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Relevancia</SelectItem>
                    <SelectItem value="avaliacao">Melhor avaliacao</SelectItem>
                    <SelectItem value="avaliacoes">Mais avaliacoes</SelectItem>
                    <SelectItem value="nome">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                      {temFiltrosAtivos && (
                        <Badge variant="secondary" className="ml-2">
                          {categoriasSelecionadas.length + (apenasVerificados ? 1 : 0) + (cidadeSelecionada !== "Todas as cidades" ? 1 : 0)}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FiltrosContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden w-64 shrink-0 lg:block">
                <div className="sticky top-24 rounded-lg border border-border bg-card p-5">
                  <h3 className="mb-4 font-semibold text-foreground">Filtros</h3>
                  <FiltrosContent />
                </div>
              </aside>

              {/* Prestadores Grid */}
              <div className="flex-1">
                {/* Active Filters Pills */}
                {temFiltrosAtivos && (
                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground">Filtros ativos:</span>
                    {cidadeSelecionada !== "Todas as cidades" && (
                      <Badge variant="secondary" className="gap-1">
                        <MapPin className="h-3 w-3" />
                        {cidadeSelecionada}
                        <button onClick={() => setCidadeSelecionada("Todas as cidades")}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {categoriasSelecionadas.map(catId => {
                      const cat = categorias.find(c => c.id === catId)
                      return cat && (
                        <Badge key={catId} variant="secondary" className="gap-1">
                          {cat.nome}
                          <button onClick={() => toggleCategoria(catId)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )
                    })}
                    {apenasVerificados && (
                      <Badge variant="secondary" className="gap-1">
                        Verificados
                        <button onClick={() => setApenasVerificados(false)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}

                {prestadoresFiltrados.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <ChefHat className="mb-4 h-16 w-16 text-muted-foreground/50" />
                    <h3 className="mb-2 text-lg font-semibold text-foreground">Nenhum prestador encontrado</h3>
                    <p className="mb-4 text-muted-foreground">
                      Tente ajustar os filtros ou buscar por outro termo.
                    </p>
                    <Button variant="outline" onClick={limparFiltros}>
                      Limpar filtros
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {prestadoresFiltrados.map((prestador) => (
                      <Link key={prestador.id} href={`/prestador/${prestador.id}`}>
                        <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 h-full">
                          <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/30 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ChefHat className="h-16 w-16 text-primary/40" />
                            </div>
                            <div className="absolute top-3 left-3 flex gap-2">
                              <Badge className="bg-background/90 text-foreground hover:bg-background">
                                {prestador.categoria}
                              </Badge>
                              {prestador.verificado && (
                                <Badge className="bg-green-500/90 text-white hover:bg-green-500">
                                  Verificado
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardContent className="p-5">
                            <div className="mb-2 flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {prestador.nome}
                              </h3>
                              <div className="flex items-center gap-1 text-sm shrink-0">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span className="font-medium text-foreground">{prestador.avaliacao}</span>
                                <span className="text-muted-foreground">({prestador.totalAvaliacoes})</span>
                              </div>
                            </div>
                            <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              {prestador.cidade}
                            </div>
                            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                              {prestador.descricao}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {prestador.especialidades.slice(0, 3).map((esp) => (
                                <Badge key={esp} variant="secondary" className="text-xs">
                                  {esp}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
