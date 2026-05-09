'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Property } from '@/lib/data'

export default function PropertiesTable({ properties: initialProperties }: { properties: Property[] }) {
  const router = useRouter()
  const [properties, setProperties] = useState(initialProperties)

  async function deleteProperty(id: string) {
    if (!confirm('Delete this property? This cannot be undone.')) return
    await fetch(`/api/properties/${id}`, { method: 'DELETE' })
    setProperties((prev) => prev.filter((p) => p.id !== id))
    router.refresh()
  }

  if (properties.length === 0) {
    return (
      <div className="bg-white border border-gray-100 p-16 text-center">
        <p className="font-raleway text-off-black/40 mb-4">No properties yet.</p>
        <Link href="/admin/properties/new" className="font-raleway text-sm text-accent hover:opacity-70 transition-opacity underline">
          Add your first property
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-left font-montserrat text-xs text-off-black/40 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-4 text-left font-montserrat text-xs text-off-black/40 uppercase tracking-wider hidden md:table-cell">
                Price
              </th>
              <th className="px-6 py-4 text-left font-montserrat text-xs text-off-black/40 uppercase tracking-wider hidden lg:table-cell">
                Details
              </th>
              <th className="px-6 py-4 text-left font-montserrat text-xs text-off-black/40 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right font-montserrat text-xs text-off-black/40 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {properties.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-12 flex-shrink-0 overflow-hidden bg-gray-100">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-raleway text-sm font-medium text-off-black truncate max-w-[200px]">
                        {p.title}
                      </p>
                      <p className="font-raleway text-xs text-off-black/40">{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="font-raleway text-sm text-off-black">{p.price}</span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="font-raleway text-xs text-off-black/60">
                    {p.beds}bd · {p.baths}ba · {p.sqft}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-montserrat font-medium px-2.5 py-1 ${
                      p.status === 'Sold'
                        ? 'bg-off-black/10 text-off-black'
                        : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/featured-properties/${p.slug}`}
                      target="_blank"
                      className="p-2 text-off-black/40 hover:text-accent transition-colors"
                      title="View on site"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </Link>
                    <Link
                      href={`/admin/properties/${p.id}/edit`}
                      className="p-2 text-off-black/40 hover:text-accent transition-colors"
                      title="Edit"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => deleteProperty(p.id)}
                      className="p-2 text-off-black/40 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
