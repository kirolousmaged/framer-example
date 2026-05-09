import Link from 'next/link'
import { getProperties, getContacts } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [properties, contacts] = await Promise.all([getProperties(), getContacts()])

  const forSale = properties.filter((p) => p.status === 'For Sale').length
  const sold = properties.filter((p) => p.status === 'Sold').length
  const unread = contacts.filter((c) => !c.read).length

  const stats = [
    {
      label: 'Total Properties',
      value: properties.length,
      href: '/admin/properties',
      color: 'bg-accent',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      label: 'For Sale',
      value: forSale,
      href: '/admin/properties',
      color: 'bg-emerald-500',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      label: 'Sold',
      value: sold,
      href: '/admin/properties',
      color: 'bg-off-black',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ),
    },
    {
      label: 'Unread Leads',
      value: unread,
      href: '/admin/contacts',
      color: unread > 0 ? 'bg-rose-500' : 'bg-gray-400',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ]

  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const recentProperties = [...properties]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="p-8 flex flex-col gap-10">
      <div>
        <h1 className="font-italiana text-4xl text-off-black">Dashboard</h1>
        <p className="font-raleway text-sm text-off-black/50 mt-1">
          Welcome back — here&apos;s an overview of your site.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white p-6 flex flex-col gap-4 border border-gray-100 hover:border-accent transition-colors"
          >
            <div className={`w-10 h-10 ${stat.color} rounded flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="font-italiana text-4xl text-off-black">{stat.value}</p>
              <p className="font-montserrat text-xs text-off-black/50 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent contacts */}
        <div className="bg-white border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-raleway font-medium text-off-black">Recent Leads</h2>
            <Link href="/admin/contacts" className="font-raleway text-xs text-accent hover:opacity-70 transition-opacity">
              View all
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="px-6 py-8 font-raleway text-sm text-off-black/40 text-center">
              No contact submissions yet.
            </p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentContacts.map((c) => (
                <li key={c.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className={`font-raleway text-sm text-off-black truncate ${!c.read ? 'font-medium' : ''}`}>
                      {c.firstName} {c.lastName}
                    </p>
                    <p className="font-raleway text-xs text-off-black/50 truncate">{c.email}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!c.read && (
                      <span className="w-2 h-2 bg-accent rounded-full" />
                    )}
                    <span className="font-montserrat text-xs text-off-black/40">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent properties */}
        <div className="bg-white border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-raleway font-medium text-off-black">Recent Properties</h2>
            <Link href="/admin/properties" className="font-raleway text-xs text-accent hover:opacity-70 transition-opacity">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-gray-50">
            {recentProperties.map((p) => (
              <li key={p.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-raleway text-sm text-off-black truncate">{p.title}</p>
                  <p className="font-raleway text-xs text-off-black/50">{p.price}</p>
                </div>
                <span
                  className={`flex-shrink-0 text-xs font-montserrat font-medium px-2.5 py-1 ${
                    p.status === 'Sold'
                      ? 'bg-off-black/10 text-off-black'
                      : 'bg-accent/10 text-accent'
                  }`}
                >
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
