'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { PropertySubmission } from '@/lib/data'

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-700',
  contacted: 'bg-blue-100 text-blue-700',
  accepted:  'bg-emerald-100 text-emerald-700',
  rejected:  'bg-red-100 text-red-600',
}

export default function SubmissionsTable({ submissions: initial }: { submissions: PropertySubmission[] }) {
  const router = useRouter()
  const [submissions, setSubmissions] = useState(initial)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm('Delete this submission?')) return
    setDeleting(id)
    await fetch(`/api/submissions/${id}`, { method: 'DELETE' })
    setSubmissions((prev) => prev.filter((s) => s.id !== id))
    setDeleting(null)
    router.refresh()
  }

  if (submissions.length === 0) {
    return (
      <div className="bg-white border border-gray-100 p-12 text-center">
        <p className="font-raleway text-sm text-off-black/40">No submissions yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {['Seller', 'Property', 'Asking Price', 'Status', 'Date', ''].map((h) => (
              <th key={h} className={`text-left px-6 py-4 font-montserrat text-xs text-off-black/50 uppercase tracking-wider ${!h ? '' : ''} ${h === 'Asking Price' || h === 'Date' ? 'hidden lg:table-cell' : ''} ${h === 'Status' ? 'hidden md:table-cell' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {submissions.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-raleway text-sm text-off-black font-medium">{s.name}</span>
                  <span className="font-raleway text-xs text-off-black/40">{s.email}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-raleway text-sm text-off-black line-clamp-1">{s.propertyTitle}</span>
                  <span className="font-raleway text-xs text-off-black/40">{s.propertyType}</span>
                </div>
              </td>
              <td className="px-6 py-4 hidden lg:table-cell">
                <span className="font-raleway text-sm text-off-black">{s.askingPrice || '—'}</span>
              </td>
              <td className="px-6 py-4 hidden md:table-cell">
                <span className={`inline-block text-xs font-montserrat font-medium px-2.5 py-1 capitalize ${STATUS_STYLES[s.status]}`}>
                  {s.status}
                </span>
              </td>
              <td className="px-6 py-4 hidden lg:table-cell">
                <span className="font-raleway text-xs text-off-black/50">
                  {new Date(s.createdAt).toLocaleDateString()}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/submissions/${s.id}`}
                    className="p-2 text-off-black/40 hover:text-off-black transition-colors"
                    title="View details"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDelete(s.id)}
                    disabled={deleting === s.id}
                    className="p-2 text-off-black/40 hover:text-red-500 transition-colors disabled:opacity-40"
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
  )
}
