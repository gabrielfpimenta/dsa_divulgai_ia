import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export default async function ClientePage() {
  const session = await getSession()
  if (!session) redirect('/login')
  if (session.role === 'admin') redirect('/admin')

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Área do Cliente</h1>
      <p className="mt-2 text-muted-foreground">Olá, {session.name}. Aqui você acompanha pedidos, favoritos e histórico.</p>
    </main>
  )
}
