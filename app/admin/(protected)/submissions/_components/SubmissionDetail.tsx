'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { PropertySubmission } from '@/lib/data'

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-700',
  contacted: 'bg-blue-100 text-blue-700',
  accepted:  'bg-emerald-100 text-emerald-700',
  rejected:  'bg-red-100 text-red-600',
}

export default function SubmissionDetail({ submission: initial }: { submission: PropertySubmission }) {
  const router = useRouter()
  const [submission, setSubmission] = useState(initial)
  const [notes, setNotes] = useState(initial.adminNotes)
  const [saving, setSaving] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)

  async function updateStatus(status: PropertySubmission['status']) {
    setSaving(true)
    const res = await fetch(`/api/submissions/${submission.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes: notes }),
    })
    if (res.ok) {
      const updated = await res.json()
      setSubmission(updated)
      router.refresh()
    }
    setSaving(false)
  }

  async function saveNotes() {
    setSaving(true)
    const res = await fetch(`/api/submissions/${submission.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: submission.status, adminNotes: notes }),
    })
    if (res.ok) {
      const updated = await res.json()
      setSubmission(updated)
      router.refresh()
    }
    setSaving(false)
  }

  const inputClass = 'w-full px-4 py-3 border border-gray-200 font-raleway text-sm text-off-black focus:outline-none focus:border-accent transition-colors bg-white'

  return (
    <div className="flex flex-col gap-6">
      {/* Status bar */}
      <div className="bg-white border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-montserrat text-xs text-off-black/50 uppercase tracking-wider">Status:</span>
          <span className={`text-xs font-montserrat font-medium px-3 py-1.5 capitalize ${STATUS_STYLES[submission.status]}`}>
            {submission.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateStatus('contacted')}
            disabled={saving || submission.status === 'contacted'}
            className="px-4 py-2 bg-blue-500 text-white font-raleway text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-40"
          >
            Mark Contacted
          </button>
          <button
            onClick={() => updateStatus('accepted')}
            disabled={saving || submission.status === 'accepted'}
            className="px-4 py-2 bg-emerald-500 text-white font-raleway text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-40"
          >
            Accept
          </button>
          <button
            onClick={() => updateStatus('rejected')}
            disabled={saving || submission.status === 'rejected'}
            className="px-4 py-2 bg-red-500 text-white font-raleway text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-40"
          >
            Reject
          </button>
          {submission.status === 'accepted' && (
            <Link
              href="/admin/properties/new"
              className="px-4 py-2 bg-accent text-white font-raleway text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              Create Listing →
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Property info */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Property details */}
          <div className="bg-white border border-gray-100 p-6 flex flex-col gap-5">
            <h2 className="font-raleway font-medium text-off-black">Property Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Title',    value: submission.propertyTitle },
                { label: 'Address',  value: submission.address || '—' },
                { label: 'Type',     value: submission.propertyType },
                { label: 'Price',    value: submission.askingPrice || '—' },
                { label: 'Beds',     value: submission.beds || '—' },
                { label: 'Baths',    value: submission.baths || '—' },
                { label: 'Sq. Ft.',  value: submission.sqft || '—' },
                { label: 'Submitted', value: new Date(submission.createdAt).toLocaleDateString() },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-montserrat text-xs text-off-black/40 uppercase tracking-wider mb-1">{label}</p>
                  <p className="font-raleway text-sm text-off-black">{String(value)}</p>
                </div>
              ))}
            </div>
            {submission.description && (
              <div>
                <p className="font-montserrat text-xs text-off-black/40 uppercase tracking-wider mb-2">Description</p>
                <p className="font-raleway text-sm text-off-black/70 leading-relaxed">{submission.description}</p>
              </div>
            )}
          </div>

          {/* Photos */}
          {submission.images.length > 0 && (
            <div className="bg-white border border-gray-100 p-6 flex flex-col gap-4">
              <h2 className="font-raleway font-medium text-off-black">Photos ({submission.images.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {submission.images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="relative aspect-[4/3] bg-gray-100 overflow-hidden group"
                  >
                    <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="200px" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Seller info + notes */}
        <div className="flex flex-col gap-6">
          {/* Seller contact — highlighted for easy access */}
          <div className="bg-accent/5 border border-accent/20 p-6 flex flex-col gap-4">
            <h2 className="font-raleway font-medium text-off-black flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Seller Contact
            </h2>
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-montserrat text-xs text-off-black/40 uppercase tracking-wider mb-1">Name</p>
                <p className="font-raleway text-sm font-medium text-off-black">{submission.name}</p>
              </div>
              <div>
                <p className="font-montserrat text-xs text-off-black/40 uppercase tracking-wider mb-1">Email</p>
                <a href={`mailto:${submission.email}`} className="font-raleway text-sm text-accent hover:underline">{submission.email}</a>
              </div>
              {submission.phone && (
                <div>
                  <p className="font-montserrat text-xs text-off-black/40 uppercase tracking-wider mb-1">Phone</p>
                  <a href={`tel:${submission.phone}`} className="font-raleway text-sm text-accent hover:underline">{submission.phone}</a>
                </div>
              )}
            </div>
          </div>

          {/* Admin notes */}
          <div className="bg-white border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="font-raleway font-medium text-off-black">Admin Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="Internal notes about this submission..."
              className={`${inputClass} resize-none`}
            />
            <button
              onClick={saveNotes}
              disabled={saving}
              className="px-6 py-2.5 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Notes'}
            </button>
          </div>
        </div>
      </div>

      {/* Back link */}
      <Link href="/admin/submissions" className="inline-flex items-center gap-2 font-raleway text-sm text-off-black/50 hover:text-off-black transition-colors w-fit">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Submissions
      </Link>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={submission.images[lightbox]}
              alt="Full size"
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[80vh]"
            />
            <button onClick={() => setLightbox(null)} className="absolute top-3 right-3 w-9 h-9 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
