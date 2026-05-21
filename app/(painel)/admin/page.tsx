import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import AdminPage from '@/app/admin/page'

export default async function AdminProtected() {
  const session = await getSession()
  if (!session) redirect('/login')
  if (session.role !== 'admin') redirect('/cliente')
  return <AdminPage />
}
