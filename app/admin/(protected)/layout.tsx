import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminNav from '../_components/AdminNav'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (!token || token !== process.env.ADMIN_SECRET) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen flex font-raleway bg-gray-50">
      <AdminNav />
      <div className="flex-1 ml-64 min-h-screen">{children}</div>
    </div>
  )
}
