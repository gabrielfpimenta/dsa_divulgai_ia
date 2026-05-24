import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const perguntas = [
  { pergunta: "Como encontro um prestador?", resposta: "Acesse Explorar, filtre por cidade, categoria e avaliações e escolha o perfil que melhor atende sua necessidade." },
  { pergunta: "Como entro em contato com o prestador?", resposta: "No catálogo, abra o perfil do prestador e use os botões de contato para negociar detalhes, valores e prazos." },
  { pergunta: "O Divulgai realiza entregas?", resposta: "O Divulgai conecta cliente e prestador. As condições de entrega e retirada são combinadas diretamente com cada prestador." },
  { pergunta: "Como me cadastro como prestador?", resposta: "Clique em Cadastrar, complete seus dados e depois finalize o perfil com descrição, especialidades e região atendida." },
]

export default function FaqPage() {
  return <div className="flex min-h-screen flex-col"><Header /><main className="flex-1 py-16"><div className="container mx-auto max-w-4xl px-4"><h1 className="mb-2 text-3xl font-bold">Perguntas Frequentes</h1><p className="mb-8 text-muted-foreground">Dúvidas comuns sobre uso da plataforma.</p><div className="space-y-4">{perguntas.map((item) => <Card key={item.pergunta}><CardHeader><CardTitle className="text-xl">{item.pergunta}</CardTitle></CardHeader><CardContent className="text-muted-foreground">{item.resposta}</CardContent></Card>)}</div></div></main><Footer /></div>
}
