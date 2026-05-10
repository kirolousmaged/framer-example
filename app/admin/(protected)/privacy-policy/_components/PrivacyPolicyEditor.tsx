'use client'
import { useState } from 'react'

export default function PrivacyPolicyEditor({ initialContent }: { initialContent: string }) {
  const [content, setContent] = useState(initialContent)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true)
    await fetch('/api/content', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ privacy_policy: content }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="bg-white border border-gray-100 p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-raleway font-medium text-off-black">Policy Content</h2>
          <p className="font-raleway text-xs text-off-black/40 mt-1">
            Use double line breaks to separate paragraphs. Short lines without a period at the end become section headings.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-shrink-0 flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors disabled:opacity-60"
        >
          {saved ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Saved
            </>
          ) : saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={32}
        className="w-full px-4 py-3 border border-gray-200 font-raleway text-sm text-off-black focus:outline-none focus:border-accent transition-colors bg-white resize-y"
        placeholder="Write the privacy policy content here..."
      />
    </div>
  )
}
