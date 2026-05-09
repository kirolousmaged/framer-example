'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Contact } from '@/lib/data'

export default function ContactsClient({ initialContacts }: { initialContacts: Contact[] }) {
  const router = useRouter()
  const [contacts, setContacts] = useState(initialContacts)
  const [expanded, setExpanded] = useState<string | null>(null)

  const unread = contacts.filter((c) => !c.read).length

  async function markRead(id: string) {
    await fetch(`/api/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    })
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, read: true } : c)))
    router.refresh()
  }

  async function deleteContact(id: string) {
    if (!confirm('Delete this lead? This cannot be undone.')) return
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
    setContacts((prev) => prev.filter((c) => c.id !== id))
    router.refresh()
  }

  const sorted = [...contacts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-italiana text-4xl text-off-black">Contact Leads</h1>
          <p className="font-raleway text-sm text-off-black/50 mt-1">
            {contacts.length} total · {unread} unread
          </p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white border border-gray-100 p-16 text-center">
          <p className="font-raleway text-off-black/40">No contact submissions yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((c) => (
            <div
              key={c.id}
              className={`bg-white border transition-colors ${
                !c.read ? 'border-accent/30' : 'border-gray-100'
              }`}
            >
              {/* Header row */}
              <button
                onClick={() => {
                  setExpanded(expanded === c.id ? null : c.id)
                  if (!c.read) markRead(c.id)
                }}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {!c.read && <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />}
                  <div className="min-w-0">
                    <p className={`font-raleway text-sm text-off-black truncate ${!c.read ? 'font-medium' : ''}`}>
                      {c.firstName} {c.lastName}
                    </p>
                    <p className="font-raleway text-xs text-off-black/50 truncate">{c.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-montserrat text-xs text-off-black/40 hidden sm:block">
                    {new Date(c.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-off-black/40 transition-transform ${expanded === c.id ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </button>

              {/* Expanded content */}
              {expanded === c.id && (
                <div className="px-6 pb-6 flex flex-col gap-6 border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-montserrat text-xs text-off-black/40 uppercase tracking-wider mb-1">
                        Name
                      </p>
                      <p className="font-raleway text-sm text-off-black">
                        {c.firstName} {c.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="font-montserrat text-xs text-off-black/40 uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${c.email}`}
                        className="font-raleway text-sm text-accent hover:opacity-70 transition-opacity"
                      >
                        {c.email}
                      </a>
                    </div>
                    {c.phone && (
                      <div>
                        <p className="font-montserrat text-xs text-off-black/40 uppercase tracking-wider mb-1">
                          Phone
                        </p>
                        <a
                          href={`tel:${c.phone}`}
                          className="font-raleway text-sm text-accent hover:opacity-70 transition-opacity"
                        >
                          {c.phone}
                        </a>
                      </div>
                    )}
                    <div>
                      <p className="font-montserrat text-xs text-off-black/40 uppercase tracking-wider mb-1">
                        Received
                      </p>
                      <p className="font-raleway text-sm text-off-black">
                        {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-montserrat text-xs text-off-black/40 uppercase tracking-wider mb-2">
                      Message
                    </p>
                    <p className="font-raleway text-sm text-off-black/80 leading-relaxed whitespace-pre-line bg-gray-50 p-4">
                      {c.message}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${c.email}`}
                      className="px-5 py-2.5 bg-accent text-white font-raleway text-sm font-medium hover:bg-accent-hover transition-colors"
                    >
                      Reply via Email
                    </a>
                    <button
                      onClick={() => deleteContact(c.id)}
                      className="px-5 py-2.5 border border-red-200 text-red-500 font-raleway text-sm hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
