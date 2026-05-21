import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">D</span>
              </div>
              <span className="text-xl font-bold text-foreground">Divulgai</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Conectando voce ao sabor local. Encontre os melhores prestadores de servicos alimenticios da sua regiao.
            </p>
          </div>

          {/* Links Rapidos */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Links Rapidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Explorar Prestadores
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Sobre Nos
                </Link>
              </li>
            </ul>
          </div>

          {/* Para Prestadores */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Para Prestadores</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/seja-parceiro" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Seja um Parceiro
                </Link>
              </li>
              <li>
                <Link href="/app" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Baixe o App
                </Link>
              </li>
              <li>
                <Link href="/ajuda/prestador" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Central de Ajuda
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contato" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Politica de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            2026 Divulgai. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Desenvolvido por alunos da FIEB - Curso Tecnico em Informatica
          </p>
        </div>
      </div>
    </footer>
  )
}
