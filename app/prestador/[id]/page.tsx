"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle,
  Instagram,
  Facebook,
  Clock,
  ChefHat,
  ArrowLeft,
  Share2,
  Heart,
  CheckCircle2,
  Send
} from "lucide-react"

// Dados mockados - em producao viria da API
const prestadoresData: Record<string, {
  id: number
  nome: string
  categoria: string
  avaliacao: number
  totalAvaliacoes: number
  cidade: string
  endereco: string
  descricao: string
  descricaoCompleta: string
  especialidades: string[]
  verificado: boolean
  telefone: string
  whatsapp: string
  instagram: string
  facebook: string
  horarioFuncionamento: string
  formasPagamento: string[]
  avaliacoes: Array<{
    id: number
    nome: string
    avaliacao: number
    comentario: string
    data: string
  }>
  produtos: Array<{
    id: number
    nome: string
    descricao: string
    preco: string
  }>
}> = {
  "1": {
    id: 1,
    nome: "Doces da Maria",
    categoria: "Bolos e Doces",
    avaliacao: 4.9,
    totalAvaliacoes: 127,
    cidade: "Barueri, SP",
    endereco: "Jardim Belval, Barueri - SP",
    descricao: "Bolos decorados, cupcakes e doces finos para festas e eventos.",
    descricaoCompleta: "Com mais de 10 anos de experiencia, a Doces da Maria se especializou em criar bolos decorados unicos e personalizados para todos os tipos de eventos. Trabalhamos com ingredientes selecionados e receitas exclusivas que conquistam pelo sabor e pela apresentacao. Cada bolo e feito com carinho e atencao aos detalhes, garantindo que seu momento especial seja ainda mais memoravel.",
    especialidades: ["Bolos Decorados", "Cupcakes", "Doces Finos", "Bolos Tematicos", "Naked Cakes"],
    verificado: true,
    telefone: "(11) 99999-1234",
    whatsapp: "5511999991234",
    instagram: "@docesdamaria",
    facebook: "docesdamaria",
    horarioFuncionamento: "Seg a Sex: 8h - 18h | Sab: 8h - 14h",
    formasPagamento: ["Dinheiro", "PIX", "Cartao de Credito", "Cartao de Debito"],
    avaliacoes: [
      { id: 1, nome: "Ana Paula", avaliacao: 5, comentario: "Bolo maravilhoso! Todos os convidados amaram. Super recomendo!", data: "15/01/2026" },
      { id: 2, nome: "Carlos Silva", avaliacao: 5, comentario: "Profissional incrivel. Entrega no prazo e qualidade impecavel.", data: "10/01/2026" },
      { id: 3, nome: "Mariana Costa", avaliacao: 4, comentario: "Cupcakes deliciosos, decoracao linda. Voltarei a comprar!", data: "05/01/2026" },
    ],
    produtos: [
      { id: 1, nome: "Bolo Decorado (1kg)", descricao: "Bolo personalizado com tema a escolha", preco: "R$ 120,00" },
      { id: 2, nome: "Cupcakes (12 un)", descricao: "Cupcakes decorados sortidos", preco: "R$ 60,00" },
      { id: 3, nome: "Naked Cake (2kg)", descricao: "Bolo rustico com frutas frescas", preco: "R$ 180,00" },
      { id: 4, nome: "Docinhos (100 un)", descricao: "Brigadeiros, beijinhos e cajuzinhos", preco: "R$ 150,00" },
    ]
  },
  "2": {
    id: 2,
    nome: "Marmitas Fit do Joao",
    categoria: "Marmitas",
    avaliacao: 4.8,
    totalAvaliacoes: 89,
    cidade: "Osasco, SP",
    endereco: "Centro, Osasco - SP",
    descricao: "Refeicoes saudaveis e equilibradas entregues na sua casa.",
    descricaoCompleta: "O Marmitas Fit do Joao nasceu da paixao por alimentacao saudavel e pratica. Oferecemos refeicoes balanceadas, preparadas com ingredientes frescos e naturais, ideais para quem busca manter uma dieta equilibrada sem abrir mao do sabor. Temos opcoes low carb, veganas e proteicas para atender diferentes necessidades.",
    especialidades: ["Low Carb", "Proteico", "Vegano", "Fitness", "Congelados"],
    verificado: true,
    telefone: "(11) 98888-5678",
    whatsapp: "5511988885678",
    instagram: "@marmitasfitjoao",
    facebook: "marmitasfitjoao",
    horarioFuncionamento: "Seg a Sex: 7h - 20h | Sab: 8h - 16h",
    formasPagamento: ["Dinheiro", "PIX", "Cartao de Credito"],
    avaliacoes: [
      { id: 1, nome: "Roberto Lima", avaliacao: 5, comentario: "Comida saudavel e muito saborosa. Virei cliente fiel!", data: "12/01/2026" },
      { id: 2, nome: "Fernanda Souza", avaliacao: 5, comentario: "Entrega sempre no horario e comida fresquinha.", data: "08/01/2026" },
      { id: 3, nome: "Pedro Santos", avaliacao: 4, comentario: "Boas porcoes e otimo custo-beneficio.", data: "03/01/2026" },
    ],
    produtos: [
      { id: 1, nome: "Marmita Fit Frango", descricao: "Frango grelhado com legumes e arroz integral", preco: "R$ 25,00" },
      { id: 2, nome: "Marmita Low Carb", descricao: "Proteina com salada e legumes", preco: "R$ 28,00" },
      { id: 3, nome: "Marmita Vegana", descricao: "Proteina vegetal com graos e vegetais", preco: "R$ 26,00" },
      { id: 4, nome: "Kit Semanal (5 un)", descricao: "5 marmitas variadas", preco: "R$ 110,00" },
    ]
  },
  "3": {
    id: 3,
    nome: "Salgados da Dona Ana",
    categoria: "Salgados",
    avaliacao: 4.7,
    totalAvaliacoes: 203,
    cidade: "Barueri, SP",
    endereco: "Alphaville, Barueri - SP",
    descricao: "Salgados fresquinhos para festas, reunioes e eventos corporativos.",
    descricaoCompleta: "Ha mais de 20 anos, a Dona Ana prepara os melhores salgados da regiao. Nossa tradicao familiar garante receitas unicas passadas de geracao em geracao. Trabalhamos com ingredientes de qualidade e todo o carinho que sua festa merece. Atendemos desde pequenas reunioes ate grandes eventos corporativos.",
    especialidades: ["Coxinha", "Esfiha", "Empadas", "Kibe", "Risoles"],
    verificado: true,
    telefone: "(11) 97777-9012",
    whatsapp: "5511977779012",
    instagram: "@salgadosdaana",
    facebook: "salgadosdaana",
    horarioFuncionamento: "Seg a Sab: 6h - 19h",
    formasPagamento: ["Dinheiro", "PIX", "Cartao de Debito"],
    avaliacoes: [
      { id: 1, nome: "Julia Mendes", avaliacao: 5, comentario: "Melhor coxinha que ja comi! Receita incrivel.", data: "14/01/2026" },
      { id: 2, nome: "Ricardo Alves", avaliacao: 5, comentario: "Fiz uma festa com 300 salgados, todos perfeitos!", data: "09/01/2026" },
      { id: 3, nome: "Amanda Oliveira", avaliacao: 4, comentario: "Salgados muito saborosos e bem recheados.", data: "02/01/2026" },
    ],
    produtos: [
      { id: 1, nome: "Cento de Salgados", descricao: "Mix de salgados fritos sortidos", preco: "R$ 80,00" },
      { id: 2, nome: "Cento de Mini Salgados", descricao: "Salgados mini para festas", preco: "R$ 65,00" },
      { id: 3, nome: "Coxinha (10 un)", descricao: "Coxinhas grandes de frango", preco: "R$ 25,00" },
      { id: 4, nome: "Esfiha (10 un)", descricao: "Esfihas abertas de carne", preco: "R$ 30,00" },
    ]
  }
}

export default function PrestadorPage() {
  const params = useParams()
  const id = params.id as string
  const [novaAvaliacao, setNovaAvaliacao] = useState("")
  const [notaAvaliacao, setNotaAvaliacao] = useState(5)
  const [favoritado, setFavoritado] = useState(false)

  const prestador = prestadoresData[id]

  if (!prestador) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <ChefHat className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
            <h1 className="mb-2 text-2xl font-bold">Prestador nao encontrado</h1>
            <p className="mb-4 text-muted-foreground">O prestador que voce procura nao existe ou foi removido.</p>
            <Button asChild>
              <Link href="/catalogo">Voltar ao catalogo</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-border bg-card py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/catalogo" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao catalogo
              </Link>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
              {/* Avatar/Image */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative h-32 w-32 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/40 flex items-center justify-center lg:h-40 lg:w-40">
                  <ChefHat className="h-16 w-16 text-primary/60 lg:h-20 lg:w-20" />
                  {prestador.verificado && (
                    <div className="absolute -bottom-2 -right-2 rounded-full bg-green-500 p-1.5">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-2 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  <Badge variant="secondary">{prestador.categoria}</Badge>
                  {prestador.verificado && (
                    <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Verificado
                    </Badge>
                  )}
                </div>
                
                <h1 className="mb-2 text-3xl font-bold text-foreground lg:text-4xl">{prestador.nome}</h1>
                
                <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-start">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-foreground">{prestador.avaliacao}</span>
                    <span>({prestador.totalAvaliacoes} avaliacoes)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {prestador.cidade}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {prestador.horarioFuncionamento}
                  </div>
                </div>

                <p className="mb-6 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  {prestador.descricao}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Button size="lg" asChild>
                    <a href={`https://wa.me/${prestador.whatsapp}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href={`tel:${prestador.telefone}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      Ligar
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setFavoritado(!favoritado)}
                  >
                    <Heart className={`mr-2 h-5 w-5 ${favoritado ? "fill-red-500 text-red-500" : ""}`} />
                    {favoritado ? "Favoritado" : "Favoritar"}
                  </Button>
                  <Button size="lg" variant="ghost">
                    <Share2 className="mr-2 h-5 w-5" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Main Content */}
              <div className="flex-1">
                <Tabs defaultValue="sobre" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="sobre">Sobre</TabsTrigger>
                    <TabsTrigger value="produtos">Produtos</TabsTrigger>
                    <TabsTrigger value="avaliacoes">Avaliacoes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="sobre" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sobre o prestador</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {prestador.descricaoCompleta}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Especialidades</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {prestador.especialidades.map((esp) => (
                            <Badge key={esp} variant="secondary" className="text-sm">
                              {esp}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Formas de pagamento</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {prestador.formasPagamento.map((forma) => (
                            <Badge key={forma} variant="outline" className="text-sm">
                              {forma}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="produtos" className="space-y-4">
                    {prestador.produtos.map((produto) => (
                      <Card key={produto.id}>
                        <CardContent className="flex items-center justify-between p-4">
                          <div>
                            <h4 className="font-semibold text-foreground">{produto.nome}</h4>
                            <p className="text-sm text-muted-foreground">{produto.descricao}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-primary">{produto.preco}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="avaliacoes" className="space-y-6">
                    {/* Nova avaliacao */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Deixe sua avaliacao</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((nota) => (
                            <button
                              key={nota}
                              onClick={() => setNotaAvaliacao(nota)}
                              className="p-1"
                            >
                              <Star 
                                className={`h-6 w-6 ${nota <= notaAvaliacao ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} 
                              />
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {notaAvaliacao} estrela{notaAvaliacao > 1 ? "s" : ""}
                          </span>
                        </div>
                        <Textarea 
                          placeholder="Conte como foi sua experiencia..."
                          value={novaAvaliacao}
                          onChange={(e) => setNovaAvaliacao(e.target.value)}
                        />
                        <Button>
                          <Send className="mr-2 h-4 w-4" />
                          Enviar avaliacao
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Lista de avaliacoes */}
                    <div className="space-y-4">
                      {prestador.avaliacoes.map((avaliacao) => (
                        <Card key={avaliacao.id}>
                          <CardContent className="p-4">
                            <div className="mb-3 flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback className="bg-primary/10 text-primary">
                                    {avaliacao.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-foreground">{avaliacao.nome}</p>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((nota) => (
                                        <Star 
                                          key={nota}
                                          className={`h-3 w-3 ${nota <= avaliacao.avaliacao ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} 
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{avaliacao.data}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{avaliacao.comentario}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <aside className="lg:w-80">
                <div className="sticky top-24 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <a 
                        href={`https://wa.me/${prestador.whatsapp}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                      >
                        <MessageCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">WhatsApp</p>
                          <p className="text-xs text-muted-foreground">{prestador.telefone}</p>
                        </div>
                      </a>
                      <a 
                        href={`tel:${prestador.telefone}`}
                        className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                      >
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Telefone</p>
                          <p className="text-xs text-muted-foreground">{prestador.telefone}</p>
                        </div>
                      </a>
                      <a 
                        href={`https://instagram.com/${prestador.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                      >
                        <Instagram className="h-5 w-5 text-pink-500" />
                        <div>
                          <p className="text-sm font-medium">Instagram</p>
                          <p className="text-xs text-muted-foreground">{prestador.instagram}</p>
                        </div>
                      </a>
                      <a 
                        href={`https://facebook.com/${prestador.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                      >
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium">Facebook</p>
                          <p className="text-xs text-muted-foreground">/{prestador.facebook}</p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Localizacao</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{prestador.endereco}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Horario de Funcionamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-2">
                        <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{prestador.horarioFuncionamento}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
