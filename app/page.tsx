"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, Clock, Users, Smartphone, Monitor, Server, Database, FileText, Presentation } from "lucide-react"

const sprints = [
  {
    id: 1,
    nome: "Sprint 0 - Planejamento e Setup",
    duracao: "2 semanas",
    horas: "~20h",
    objetivo: "Estruturar o projeto, definir papéis e preparar ambiente de desenvolvimento",
    tarefas: [
      {
        titulo: "Definição de Papéis Scrum",
        responsavel: "Todos",
        descricao: "Definir Product Owner, Scrum Master e Time Scrum",
        ferramenta: "Reunião presencial",
        mobile: true
      },
      {
        titulo: "Documentação Inicial",
        responsavel: "Product Owner",
        descricao: "Criar documento norteador com introdução, justificativa e cenário atual",
        ferramenta: "Google Docs",
        mobile: true
      },
      {
        titulo: "Levantamento de Requisitos",
        responsavel: "Todos",
        descricao: "Definir requisitos funcionais e não funcionais do sistema",
        ferramenta: "Google Docs / Notion",
        mobile: true
      },
      {
        titulo: "Setup de Repositório",
        responsavel: "Time Scrum",
        descricao: "Criar repositório no GitHub com estrutura de pastas para frontend, mobile, backend",
        ferramenta: "GitHub Mobile",
        mobile: true
      },
      {
        titulo: "Configuração de Ferramentas",
        responsavel: "Todos",
        descricao: "Instalar VS Code / Cursor no celular, configurar Expo Go, testar conexão com GitHub",
        ferramenta: "Termux / VS Code Server",
        mobile: true
      }
    ],
    entregaveis: ["Documento Norteador (parcial)", "Repositório GitHub criado", "Ambiente configurado"]
  },
  {
    id: 2,
    nome: "Sprint 1 - Modelagem e Prototipação",
    duracao: "2 semanas",
    horas: "~20h",
    objetivo: "Criar modelos visuais e estrutura do banco de dados",
    tarefas: [
      {
        titulo: "Diagrama de Caso de Uso",
        responsavel: "Product Owner + 1 Dev",
        descricao: "Criar diagrama UML com todos os atores e casos de uso do sistema",
        ferramenta: "Draw.io / Lucidchart",
        mobile: true
      },
      {
        titulo: "Modelagem do Banco de Dados",
        responsavel: "Time Scrum (BD)",
        descricao: "Criar DER com todas as entidades, atributos e relacionamentos",
        ferramenta: "Draw.io / DBDiagram.io",
        mobile: true
      },
      {
        titulo: "Protótipo de Baixa Fidelidade",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Desenhar wireframes das telas principais (Web e Mobile)",
        ferramenta: "Figma / Canva",
        mobile: true
      },
      {
        titulo: "Protótipo de Alta Fidelidade",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Criar protótipo navegável com cores, fontes e componentes definidos",
        ferramenta: "Figma",
        mobile: true
      },
      {
        titulo: "Definição de Regras de Negócio",
        responsavel: "Product Owner",
        descricao: "Documentar todas as regras que o sistema deve seguir",
        ferramenta: "Google Docs",
        mobile: true
      }
    ],
    entregaveis: ["Diagrama de Caso de Uso", "DER completo", "Protótipo Figma navegável", "Regras de negócio documentadas"]
  },
  {
    id: 3,
    nome: "Sprint 2 - Backend Foundation",
    duracao: "3 semanas",
    horas: "~30h",
    objetivo: "Criar estrutura do banco de dados e APIs básicas",
    tarefas: [
      {
        titulo: "Criação do Banco de Dados",
        responsavel: "Time Scrum (BD)",
        descricao: "Implementar tabelas no SQL Server conforme DER aprovado",
        ferramenta: "Azure Data Studio / DBeaver",
        mobile: false
      },
      {
        titulo: "Setup Spring Boot",
        responsavel: "Time Scrum (Backend)",
        descricao: "Criar projeto Spring Boot com dependências JPA, Security, Web",
        ferramenta: "IntelliJ / VS Code",
        mobile: false
      },
      {
        titulo: "Entidades e Repositories",
        responsavel: "Time Scrum (Backend)",
        descricao: "Mapear entidades JPA e criar repositories para cada tabela",
        ferramenta: "IntelliJ / VS Code",
        mobile: false
      },
      {
        titulo: "APIs CRUD Básicas",
        responsavel: "Time Scrum (Backend)",
        descricao: "Criar endpoints REST para operações básicas (GET, POST, PUT, DELETE)",
        ferramenta: "IntelliJ / Postman",
        mobile: true
      },
      {
        titulo: "Documentação API",
        responsavel: "Time Scrum (Backend)",
        descricao: "Configurar Swagger para documentação automática da API",
        ferramenta: "Swagger UI",
        mobile: true
      }
    ],
    entregaveis: ["Banco de dados implementado", "API REST funcional", "Documentação Swagger"]
  },
  {
    id: 4,
    nome: "Sprint 3 - Frontend Web (Cliente)",
    duracao: "3 semanas",
    horas: "~30h",
    objetivo: "Desenvolver interface web para o usuário/cliente",
    tarefas: [
      {
        titulo: "Setup React + Vite",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Criar projeto React com Vite, configurar rotas e estrutura de pastas",
        ferramenta: "VS Code / Cursor",
        mobile: true
      },
      {
        titulo: "Componentes Base",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Criar componentes reutilizáveis: Header, Footer, Cards, Botões",
        ferramenta: "VS Code / Cursor",
        mobile: true
      },
      {
        titulo: "Telas de Autenticação",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Implementar Login e Cadastro com validação de formulários",
        ferramenta: "VS Code / Cursor",
        mobile: true
      },
      {
        titulo: "Tela Principal / Home",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Criar página inicial com busca e listagem de itens/serviços",
        ferramenta: "VS Code / Cursor",
        mobile: true
      },
      {
        titulo: "Integração com API",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Conectar frontend com backend usando Axios/Fetch",
        ferramenta: "VS Code / Postman",
        mobile: true
      },
      {
        titulo: "Responsividade",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Garantir que todas as telas funcionem em dispositivos móveis",
        ferramenta: "DevTools / Chrome",
        mobile: true
      }
    ],
    entregaveis: ["Frontend Web funcional", "Integração com API", "Design responsivo"]
  },
  {
    id: 5,
    nome: "Sprint 4 - Frontend Web (Admin)",
    duracao: "2 semanas",
    horas: "~20h",
    objetivo: "Desenvolver painel administrativo",
    tarefas: [
      {
        titulo: "Dashboard Administrativo",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Criar painel com estatísticas e gráficos de uso do sistema",
        ferramenta: "VS Code / Cursor",
        mobile: true
      },
      {
        titulo: "Gerenciamento de Usuários",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Tela para visualizar, editar e bloquear usuários",
        ferramenta: "VS Code / Cursor",
        mobile: true
      },
      {
        titulo: "Gerenciamento de Prestadores/Produtos",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Tela para aprovar, editar e remover cadastros",
        ferramenta: "VS Code / Cursor",
        mobile: true
      },
      {
        titulo: "Moderação de Feedbacks",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Tela para visualizar e moderar avaliações",
        ferramenta: "VS Code / Cursor",
        mobile: true
      }
    ],
    entregaveis: ["Painel Admin completo", "Funcionalidades de gerenciamento"]
  },
  {
    id: 6,
    nome: "Sprint 5 - Mobile (React Native)",
    duracao: "3 semanas",
    horas: "~30h",
    objetivo: "Desenvolver aplicativo mobile para prestadores",
    tarefas: [
      {
        titulo: "Setup Expo",
        responsavel: "Time Scrum (Mobile)",
        descricao: "Criar projeto Expo, configurar navegação e estrutura",
        ferramenta: "VS Code + Expo Go",
        mobile: true
      },
      {
        titulo: "Telas de Autenticação",
        responsavel: "Time Scrum (Mobile)",
        descricao: "Implementar Login e Cadastro com Firebase Auth",
        ferramenta: "VS Code + Expo Go",
        mobile: true
      },
      {
        titulo: "Perfil do Prestador",
        responsavel: "Time Scrum (Mobile)",
        descricao: "Tela para criar e editar perfil profissional",
        ferramenta: "VS Code + Expo Go",
        mobile: true
      },
      {
        titulo: "Upload de Imagens",
        responsavel: "Time Scrum (Mobile)",
        descricao: "Implementar seleção e upload de fotos do celular",
        ferramenta: "VS Code + Expo Go",
        mobile: true
      },
      {
        titulo: "Integração com API",
        responsavel: "Time Scrum (Mobile)",
        descricao: "Conectar app com backend para envio de dados",
        ferramenta: "VS Code + Postman",
        mobile: true
      }
    ],
    entregaveis: ["App Mobile funcional", "Integração com backend", "APK para testes"]
  },
  {
    id: 7,
    nome: "Sprint 6 - Integração e Testes",
    duracao: "2 semanas",
    horas: "~20h",
    objetivo: "Integrar todos os sistemas e realizar testes",
    tarefas: [
      {
        titulo: "Testes de Integração",
        responsavel: "Todos",
        descricao: "Testar fluxo completo: cadastro -> login -> uso -> feedback",
        ferramenta: "Postman / Navegador",
        mobile: true
      },
      {
        titulo: "Correção de Bugs",
        responsavel: "Time Scrum",
        descricao: "Identificar e corrigir erros encontrados nos testes",
        ferramenta: "VS Code / IntelliJ",
        mobile: true
      },
      {
        titulo: "Deploy Backend",
        responsavel: "Time Scrum (Backend)",
        descricao: "Publicar API em servidor (Railway, Render, ou similar)",
        ferramenta: "Railway / Render",
        mobile: true
      },
      {
        titulo: "Deploy Frontend",
        responsavel: "Time Scrum (Frontend)",
        descricao: "Publicar site na Vercel",
        ferramenta: "Vercel",
        mobile: true
      },
      {
        titulo: "Build APK",
        responsavel: "Time Scrum (Mobile)",
        descricao: "Gerar APK de produção para demonstração",
        ferramenta: "Expo / EAS Build",
        mobile: true
      }
    ],
    entregaveis: ["Sistema integrado", "Deploy em produção", "APK final"]
  },
  {
    id: 8,
    nome: "Sprint 7 - Documentação e Apresentação",
    duracao: "2 semanas",
    horas: "~20h",
    objetivo: "Finalizar documentação e preparar apresentação",
    tarefas: [
      {
        titulo: "Manual do Usuário",
        responsavel: "Time Scrum",
        descricao: "Criar guia de uso do sistema Web e Mobile",
        ferramenta: "Google Docs / Canva",
        mobile: true
      },
      {
        titulo: "Finalização do Documento Norteador",
        responsavel: "Product Owner",
        descricao: "Completar todas as seções do documento de TCC",
        ferramenta: "Google Docs",
        mobile: true
      },
      {
        titulo: "Slides da Apresentação",
        responsavel: "Todos",
        descricao: "Criar apresentação de slides para a banca",
        ferramenta: "Canva / Google Slides",
        mobile: true
      },
      {
        titulo: "Ensaio da Apresentação",
        responsavel: "Todos",
        descricao: "Praticar apresentação, definir falas de cada membro",
        ferramenta: "Presencial",
        mobile: true
      },
      {
        titulo: "Vídeo Demonstrativo",
        responsavel: "Time Scrum",
        descricao: "Gravar vídeo mostrando o funcionamento do sistema",
        ferramenta: "OBS / Celular",
        mobile: true
      }
    ],
    entregaveis: ["Documento Norteador completo", "Apresentação de slides", "Vídeo demo", "Manual do usuário"]
  }
]

const ferramentasMobile = [
  {
    categoria: "Editores de Código",
    ferramentas: [
      { nome: "Cursor / VS Code Server", descricao: "Acesso ao VS Code pelo navegador do celular" },
      { nome: "Replit Mobile", descricao: "IDE completa no celular com terminal" },
      { nome: "Termux", descricao: "Terminal Linux no Android para comandos git" }
    ]
  },
  {
    categoria: "Desenvolvimento Mobile",
    ferramentas: [
      { nome: "Expo Go", descricao: "Visualizar app React Native em tempo real no celular" },
      { nome: "Snack Expo", descricao: "Desenvolver React Native direto no navegador" }
    ]
  },
  {
    categoria: "Design e Prototipação",
    ferramentas: [
      { nome: "Figma (Mobile)", descricao: "Criar e visualizar protótipos" },
      { nome: "Canva", descricao: "Criar slides, banners e documentos visuais" },
      { nome: "Draw.io", descricao: "Diagramas UML e fluxogramas" }
    ]
  },
  {
    categoria: "Versionamento e Colaboração",
    ferramentas: [
      { nome: "GitHub Mobile", descricao: "Gerenciar repositórios, PRs e issues" },
      { nome: "Google Docs", descricao: "Documentação colaborativa" },
      { nome: "Notion", descricao: "Gerenciamento de tarefas e documentação" }
    ]
  },
  {
    categoria: "Testes de API",
    ferramentas: [
      { nome: "Postman (Web)", descricao: "Testar endpoints da API" },
      { nome: "Thunder Client", descricao: "Extensão VS Code para testes de API" }
    ]
  }
]

const cronograma = [
  { mes: "Março", sprints: ["Sprint 0"], semanas: "1-2" },
  { mes: "Abril", sprints: ["Sprint 1", "Sprint 2 (início)"], semanas: "3-6" },
  { mes: "Maio", sprints: ["Sprint 2 (fim)", "Sprint 3"], semanas: "7-10" },
  { mes: "Junho", sprints: ["Sprint 3 (fim)", "Sprint 4"], semanas: "11-14" },
  { mes: "Julho", sprints: ["Sprint 5"], semanas: "15-17" },
  { mes: "Agosto", sprints: ["Sprint 5 (fim)", "Sprint 6"], semanas: "18-21" },
  { mes: "Setembro", sprints: ["Sprint 6 (fim)", "Sprint 7"], semanas: "22-25" },
  { mes: "Outubro", sprints: ["Apresentação Final"], semanas: "26-28" }
]

export default function SprintPipelinePage() {
  const [activeTab, setActiveTab] = useState("sprints")

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="w-fit">Pipeline de Desenvolvimento</Badge>
            <h1 className="text-3xl font-bold text-foreground">
              Guia de Sprints para TCC
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Metodologia ágil adaptada para alunos do ensino médio técnico, 
              considerando 13h/aula semanais e desenvolvimento via celular.
            </p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card">
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">~190h</p>
                  <p className="text-sm text-muted-foreground">Total de horas</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Sprints totais</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">4-6</p>
                  <p className="text-sm text-muted-foreground">Membros ideais</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="p-4 flex items-center gap-3">
                <Smartphone className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-muted-foreground">Tarefas mobile-friendly</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:inline-grid">
            <TabsTrigger value="sprints">Sprints</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
            <TabsTrigger value="ferramentas">Ferramentas</TabsTrigger>
            <TabsTrigger value="dicas">Dicas</TabsTrigger>
          </TabsList>

          {/* Sprints Tab */}
          <TabsContent value="sprints" className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              {sprints.map((sprint) => (
                <AccordionItem key={sprint.id} value={`sprint-${sprint.id}`} className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex flex-col items-start gap-1 text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{sprint.nome}</span>
                        <Badge variant="outline">{sprint.duracao}</Badge>
                        <Badge variant="secondary">{sprint.horas}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{sprint.objetivo}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      {/* Tarefas */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Tarefas
                        </h4>
                        <div className="space-y-3">
                          {sprint.tarefas.map((tarefa, idx) => (
                            <div key={idx} className="border rounded-lg p-3 bg-muted/30">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <span className="font-medium">{tarefa.titulo}</span>
                                {tarefa.mobile && (
                                  <Badge variant="outline" className="text-xs shrink-0">
                                    <Smartphone className="h-3 w-3 mr-1" />
                                    Mobile OK
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{tarefa.descricao}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span><strong>Responsavel:</strong> {tarefa.responsavel}</span>
                                <span><strong>Ferramenta:</strong> {tarefa.ferramenta}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Entregáveis */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Entregaveis da Sprint
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {sprint.entregaveis.map((entregavel, idx) => (
                            <Badge key={idx} variant="secondary">{entregavel}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* Cronograma Tab */}
          <TabsContent value="cronograma" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cronograma Anual</CardTitle>
                <CardDescription>
                  Distribuicao das sprints ao longo do ano letivo (Marco a Outubro)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  
                  <div className="space-y-6">
                    {cronograma.map((item, idx) => (
                      <div key={idx} className="relative pl-10">
                        <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-primary" />
                        <div className="bg-card border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg">{item.mes}</h4>
                            <Badge variant="outline">Semanas {item.semanas}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.sprints.map((sprint, sidx) => (
                              <Badge key={sidx} variant="secondary">{sprint}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculo de Horas */}
            <Card>
              <CardHeader>
                <CardTitle>Calculo de Horas Disponiveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Por Semana</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>13 horas/aula x 45 min = 585 min</li>
                      <li>585 min / 60 = <strong className="text-foreground">9h45min reais</strong></li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Total do Projeto</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>~28 semanas uteis (Marco-Outubro)</li>
                      <li>28 x 9.75h = <strong className="text-foreground">~273 horas totais</strong></li>
                      <li>Margem de seguranca: ~190h planejadas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ferramentas Tab */}
          <TabsContent value="ferramentas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ferramentasMobile.map((categoria, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      {categoria.categoria}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categoria.ferramentas.map((ferramenta, fidx) => (
                        <div key={fidx} className="bg-muted/30 rounded-lg p-3">
                          <h4 className="font-medium">{ferramenta.nome}</h4>
                          <p className="text-sm text-muted-foreground">{ferramenta.descricao}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stack Tecnológica */}
            <Card>
              <CardHeader>
                <CardTitle>Stack Tecnologica Recomendada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Monitor className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <h4 className="font-medium">Frontend Web</h4>
                    <p className="text-sm text-muted-foreground">React + Vite</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Smartphone className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h4 className="font-medium">Mobile</h4>
                    <p className="text-sm text-muted-foreground">React Native + Expo</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Server className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <h4 className="font-medium">Backend</h4>
                    <p className="text-sm text-muted-foreground">Spring Boot (Java)</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Database className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <h4 className="font-medium">Banco de Dados</h4>
                    <p className="text-sm text-muted-foreground">SQL Server</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dicas Tab */}
          <TabsContent value="dicas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Desenvolvimento via Celular
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">Use Expo Snack</h4>
                    <p className="text-sm text-muted-foreground">
                      Desenvolva React Native direto no navegador do celular, sem instalar nada.
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">GitHub Codespaces</h4>
                    <p className="text-sm text-muted-foreground">
                      VS Code completo no navegador, gratuito para estudantes.
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">Divida as tarefas</h4>
                    <p className="text-sm text-muted-foreground">
                      Quem tem PC foca em backend/banco. Quem tem celular foca em design e documentacao.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Trabalho em Equipe
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">Daily Meetings</h4>
                    <p className="text-sm text-muted-foreground">
                      Reunioes rapidas de 10min no inicio de cada aula para alinhar tarefas.
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">Kanban no Notion/Trello</h4>
                    <p className="text-sm text-muted-foreground">
                      Visualize o progresso com colunas: A Fazer, Fazendo, Feito.
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">Code Review em Duplas</h4>
                    <p className="text-sm text-muted-foreground">
                      Um membro revisa o codigo do outro antes de fazer merge.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Presentation className="h-5 w-5" />
                    Preparacao para Apresentacao
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">Ensaie muito</h4>
                    <p className="text-sm text-muted-foreground">
                      Cada membro deve saber explicar qualquer parte do projeto.
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">Prepare um plano B</h4>
                    <p className="text-sm text-muted-foreground">
                      Tenha um video gravado caso a internet falhe no dia.
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">Foque no problema resolvido</h4>
                    <p className="text-sm text-muted-foreground">
                      A banca quer ver o impacto do projeto, nao so a tecnologia.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documentacao
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">Documente desde o inicio</h4>
                    <p className="text-sm text-muted-foreground">
                      Nao deixe a documentacao para o final. Atualize a cada sprint.
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">Use templates</h4>
                    <p className="text-sm text-muted-foreground">
                      Siga o modelo do Documento Norteador fornecido pela instituicao.
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <h4 className="font-medium">Prints e GIFs</h4>
                    <p className="text-sm text-muted-foreground">
                      Documente cada tela com prints. Use GIFs para mostrar interacoes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Pipeline de Sprints para TCC - Curso Tecnico em Informatica</p>
          <p className="mt-1">Adaptado para desenvolvimento com restricoes de tempo e recursos</p>
        </div>
      </footer>
    </main>
  )
}
