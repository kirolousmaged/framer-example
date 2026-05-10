'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Faq } from '@/lib/data'

interface EditingFaq {
  question: string
  answer: string
}

export default function FAQEditor({ initialFaqs }: { initialFaqs: Faq[] }) {
  const router = useRouter()
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs)
  const [editing, setEditing] = useState<Record<string, EditingFaq>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [newQ, setNewQ] = useState('')
  const [newA, setNewA] = useState('')
  const [adding, setAdding] = useState(false)

  const inputClass =
    'w-full px-4 py-3 border border-gray-200 font-raleway text-sm text-off-black focus:outline-none focus:border-accent transition-colors bg-white'

  function startEdit(faq: Faq) {
    setEditing((prev) => ({ ...prev, [faq.id]: { question: faq.question, answer: faq.answer } }))
  }

  function cancelEdit(id: string) {
    setEditing((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  async function saveEdit(faq: Faq) {
    const draft = editing[faq.id]
    if (!draft) return
    setSaving(faq.id)
    const res = await fetch(`/api/faq/${faq.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: draft.question, answer: draft.answer, position: faq.position }),
    })
    if (res.ok) {
      const updated: Faq = await res.json()
      setFaqs((prev) => prev.map((f) => (f.id === faq.id ? updated : f)))
      cancelEdit(faq.id)
      router.refresh()
    }
    setSaving(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this FAQ?')) return
    setDeleting(id)
    await fetch(`/api/faq/${id}`, { method: 'DELETE' })
    setFaqs((prev) => prev.filter((f) => f.id !== id))
    setDeleting(null)
    router.refresh()
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newQ.trim() || !newA.trim()) return
    setAdding(true)
    const res = await fetch('/api/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: newQ.trim(), answer: newA.trim() }),
    })
    if (res.ok) {
      const created: Faq = await res.json()
      setFaqs((prev) => [...prev, created])
      setNewQ('')
      setNewA('')
      router.refresh()
    }
    setAdding(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Existing FAQs */}
      {faqs.length === 0 && (
        <p className="font-raleway text-sm text-off-black/40 text-center py-8">No FAQs yet. Add one below.</p>
      )}

      {faqs.map((faq, i) => {
        const draft = editing[faq.id]
        const isEditing = Boolean(draft)

        return (
          <div key={faq.id} className="bg-white border border-gray-100 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <span className="font-montserrat text-xs text-off-black/40 uppercase tracking-wider">
                FAQ {i + 1}
              </span>
              <div className="flex items-center gap-2">
                {!isEditing && (
                  <button
                    onClick={() => startEdit(faq)}
                    className="p-2 text-off-black/40 hover:text-off-black transition-colors"
                    title="Edit"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(faq.id)}
                  disabled={deleting === faq.id}
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
            </div>

            {isEditing ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-montserrat text-xs text-off-black uppercase tracking-wider">Question</label>
                  <input
                    type="text"
                    value={draft.question}
                    onChange={(e) => setEditing((prev) => ({ ...prev, [faq.id]: { ...prev[faq.id], question: e.target.value } }))}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-montserrat text-xs text-off-black uppercase tracking-wider">Answer</label>
                  <textarea
                    value={draft.answer}
                    onChange={(e) => setEditing((prev) => ({ ...prev, [faq.id]: { ...prev[faq.id], answer: e.target.value } }))}
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => saveEdit(faq)}
                    disabled={saving === faq.id}
                    className="px-6 py-2.5 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors disabled:opacity-60"
                  >
                    {saving === faq.id ? 'Saving…' : 'Save'}
                  </button>
                  <button
                    onClick={() => cancelEdit(faq.id)}
                    className="px-6 py-2.5 border border-gray-200 text-off-black/60 font-raleway text-sm hover:border-off-black hover:text-off-black transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="font-raleway font-medium text-off-black">{faq.question}</p>
                <p className="font-raleway text-sm text-off-black/60 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        )
      })}

      {/* Add new FAQ */}
      <div className="bg-white border border-gray-100 p-6 flex flex-col gap-4">
        <h3 className="font-raleway font-medium text-off-black">Add New FAQ</h3>
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-montserrat text-xs text-off-black uppercase tracking-wider">Question</label>
            <input
              type="text"
              value={newQ}
              onChange={(e) => setNewQ(e.target.value)}
              required
              placeholder="e.g. How long does the process take?"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-montserrat text-xs text-off-black uppercase tracking-wider">Answer</label>
            <textarea
              value={newA}
              onChange={(e) => setNewA(e.target.value)}
              required
              rows={4}
              placeholder="Write the answer here..."
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={adding}
              className="px-8 py-3 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors disabled:opacity-60"
            >
              {adding ? 'Adding…' : 'Add FAQ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
