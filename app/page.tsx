import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Search, 
  MapPin, 
  Utensils, 
  Star, 
  ChefHat, 
  Clock, 
  Shield, 
  Users,
  ArrowRight,
  Cake,
  Sandwich,
  Pizza,
  Coffee,
  Heart,
  TrendingUp
} from "lucide-react"

const categorias = [
  { nome: "Bolos e Doces", icone: Cake, cor: "bg-pink-100 text-pink-700", quantidade: 45 },
  { nome: "Salgados", icone: Sandwich, cor: "bg-amber-100 text-amber-700", quantidade: 38 },
  { nome: "Marmitas", icone: Utensils, cor: "bg-green-100 text-green-700", quantidade: 52 },
  { nome: "Lanches", icone: Pizza, cor: "bg-red-100 text-red-700", quantidade: 29 },
  { nome: "Cafe e Bebidas", icone: Coffee, cor: "bg-orange-100 text-orange-700", quantidade: 21 },
  { nome: "Fitness", icone: Heart, cor: "bg-purple-100 text-purple-700", quantidade: 18 },
]

const prestadoresDestaque = [
  {
    id: 1,
    nome: "Doces da Maria",
    categoria: "Bolos e Doces",
    avaliacao: 4.9,
    totalAvaliacoes: 127,
    cidade: "Barueri, SP",
    descricao: "Bolos decorados, cupcakes e doces finos para festas e eventos.",
    especialidades: ["Bolos Decorados", "Cupcakes", "Doces Finos"]
  },
  {
    id: 2,
    nome: "Marmitas Fit do Joao",
    categoria: "Marmitas",
    avaliacao: 4.8,
    totalAvaliacoes: 89,
    cidade: "Osasco, SP",
    descricao: "Refeicoes saudaveis e equilibradas entregues na sua casa.",
    especialidades: ["Low Carb", "Proteico", "Vegano"]
  },
  {
    id: 3,
    nome: "Salgados da Dona Ana",
    categoria: "Salgados",
    avaliacao: 4.7,
    totalAvaliacoes: 203,
    cidade: "Barueri, SP",
    descricao: "Salgados fresquinhos para festas, reunioes e eventos corporativos.",
    especialidades: ["Coxinha", "Esfiha", "Empadas"]
  },
]

const estatisticas = [
  { numero: "500+", label: "Prestadores Cadastrados", icone: ChefHat },
  { numero: "10k+", label: "Clientes Satisfeitos", icone: Users },
  { numero: "4.8", label: "Avaliação Media", icone: Star },
  { numero: "15+", label: "Cidades Atendidas", icone: MapPin },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/30 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6">
                <TrendingUp className="mr-1.5 h-3 w-3" />
                Mais de 500 prestadores na plataforma
              </Badge>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Descubra o melhor da{" "}
                <span className="text-primary">comida local</span>{" "}
                perto de você
              </h1>
              
              <p className="mb-10 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
                O Divulgai conecta você a cozinheiros autonomos e pequenos empreendedores 
                do ramo alimentício da sua região. Bolos, salgados, marmitas e muito mais.
              </p>

              {/* Search Bar */}
              <div className="mx-auto max-w-2xl">
                <Card className="border-2 border-border/50 shadow-lg">
                  <CardContent className="p-3">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          placeholder="O que você procura?" 
                          className="h-12 pl-10 border-0 bg-muted/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                      <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          placeholder="Sua cidade" 
                          className="h-12 pl-10 border-0 bg-muted/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                      <Button size="lg" className="h-12 px-8" asChild>
                        <Link href="/catalogo">
                          Buscar
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        </section>

        {/* Categorias */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Explore por Categorias
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Encontre exatamente o que você procura navegando pelas nossas categorias
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {categorias.map((categoria) => (
                <Link key={categoria.nome} href={`/catalogo?categoria=${encodeURIComponent(categoria.nome)}`}>
                  <Card className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${categoria.cor} transition-transform group-hover:scale-110`}>
                        <categoria.icone className="h-6 w-6" />
                      </div>
                      <h3 className="mb-1 font-semibold text-foreground">{categoria.nome}</h3>
                      <p className="text-sm text-muted-foreground">{categoria.quantidade} prestadores</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Estatisticas */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {estatisticas.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mb-3 flex justify-center">
                    <stat.icone className="h-8 w-8 text-primary-foreground/80" />
                  </div>
                  <div className="text-4xl font-bold text-primary-foreground">{stat.numero}</div>
                  <div className="mt-1 text-sm text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prestadores em Destaque */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-foreground">
                  Prestadores em Destaque
                </h2>
                <p className="text-muted-foreground">
                  Os mais bem avaliados da plataforma
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/catalogo">
                  Ver todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {prestadoresDestaque.map((prestador) => (
                <Link key={prestador.id} href={`/prestador/${prestador.id}`}>
                  <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/30 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ChefHat className="h-16 w-16 text-primary/40" />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-background/90 text-foreground hover:bg-background">
                        {prestador.categoria}
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {prestador.nome}
                        </h3>
                        <div className="flex items-center gap-1 text-sm">
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
                        {prestador.especialidades.map((esp) => (
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
          </div>
        </section>

        {/* Como Funciona */}
        <section className="bg-muted/50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Como Funciona
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Encontrar o sabor perfeito e simples com o Divulgai
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Search className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">1. Busque</h3>
                <p className="text-muted-foreground">
                  Use nossa busca para encontrar prestadores por tipo de comida, categoria ou localizacao.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Utensils className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">2. Escolha</h3>
                <p className="text-muted-foreground">
                  Compare perfis, veja avaliações e escolha o prestador ideal para sua necessidade.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Heart className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">3. Conecte-se</h3>
                <p className="text-muted-foreground">
                  Entre em contato direto pelo WhatsApp, telefone ou redes sociais do prestador.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Seja um Parceiro */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden bg-gradient-to-r from-primary to-primary/80">
              <CardContent className="flex flex-col items-center gap-8 p-8 md:flex-row md:p-12 lg:p-16">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl text-balance">
                    Voce e um prestador de serviços alimentícios?
                  </h2>
                  <p className="mb-6 text-primary-foreground/90 text-lg">
                    Cadastre-se no Divulgai e alcance mais clientes na sua região. 
                    E gratis e facil!
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                    <Button size="lg" variant="secondary" className="h-12 px-8" asChild>
                      <Link href="/seja-parceiro">
                        Baixe o App e Cadastre-se
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                      <Link href="/como-funciona">
                        Saiba Mais
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center gap-2 rounded-xl bg-primary-foreground/10 p-6 text-center">
                    <Clock className="h-8 w-8 text-primary-foreground" />
                    <span className="text-sm font-medium text-primary-foreground">Cadastro Rapido</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-xl bg-primary-foreground/10 p-6 text-center">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                    <span className="text-sm font-medium text-primary-foreground">100% Gratuito</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
