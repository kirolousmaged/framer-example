'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'

interface ContentEditorProps {
  initialContent: Record<string, string>
}

const labelClass = 'font-montserrat text-xs text-off-black uppercase tracking-wider'
const inputClass = 'w-full px-4 py-3 border border-gray-200 font-raleway text-sm text-off-black focus:outline-none focus:border-accent transition-colors bg-white'

function Section({
  title,
  children,
  onSave,
  saving,
  saved,
}: {
  title: string
  children: React.ReactNode
  onSave: () => void
  saving: boolean
  saved: boolean
}) {
  return (
    <div className="bg-white border border-gray-100 p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-raleway font-medium text-off-black">{title}</h2>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-6 py-2.5 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors disabled:opacity-60 flex items-center gap-2"
        >
          {saving ? 'Saving…' : saved ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Saved
            </>
          ) : 'Save'}
        </button>
      </div>
      {children}
    </div>
  )
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFile(file: File) {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.url) onChange(data.url)
    setUploading(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className={labelClass}>{label}</label>
      <div className="flex gap-3">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex-shrink-0 px-4 py-3 border border-gray-200 text-off-black/60 font-raleway text-sm hover:border-off-black hover:text-off-black transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>
      {value && (
        <div className="relative w-full max-w-xs aspect-[16/9] overflow-hidden bg-gray-100 mt-1">
          <Image src={value} alt="Preview" fill className="object-cover" sizes="320px" onError={() => {}} />
        </div>
      )}
    </div>
  )
}

export default function ContentEditor({ initialContent }: ContentEditorProps) {
  const [c, setC] = useState(initialContent)
  const [sectionState, setSectionState] = useState<Record<string, { saving: boolean; saved: boolean }>>({})

  function set(key: string, value: string) {
    setC((prev) => ({ ...prev, [key]: value }))
  }

  async function saveSection(keys: string[]) {
    const sectionId = keys[0]
    setSectionState((s) => ({ ...s, [sectionId]: { saving: true, saved: false } }))
    const updates = Object.fromEntries(keys.map((k) => [k, c[k] ?? '']))
    await fetch('/api/content', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    setSectionState((s) => ({ ...s, [sectionId]: { saving: false, saved: true } }))
    setTimeout(() => setSectionState((s) => ({ ...s, [sectionId]: { saving: false, saved: false } })), 3000)
  }

  const st = (key: string) => sectionState[key] ?? { saving: false, saved: false }

  return (
    <div className="flex flex-col gap-6">

      {/* Hero */}
      <Section title="Hero Section" onSave={() => saveSection(['hero_bg_image', 'hero_subtitle', 'hero_tagline'])} saving={st('hero_bg_image').saving} saved={st('hero_bg_image').saved}>
        <ImageField label="Background Image" value={c.hero_bg_image || ''} onChange={(v) => set('hero_bg_image', v)} />
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Subtitle (above name)</label>
          <input type="text" value={c.hero_subtitle || ''} onChange={(e) => set('hero_subtitle', e.target.value)} className={inputClass} placeholder="Your Next Move Starts Here" />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Tagline (below name)</label>
          <input type="text" value={c.hero_tagline || ''} onChange={(e) => set('hero_tagline', e.target.value)} className={inputClass} placeholder="California Real Estate" />
        </div>
      </Section>

      {/* About */}
      <Section title="About Bio" onSave={() => saveSection(['about_bio_1', 'about_bio_2', 'about_photo'])} saving={st('about_bio_1').saving} saved={st('about_bio_1').saved}>
        <ImageField label="Profile Photo" value={c.about_photo || ''} onChange={(v) => set('about_photo', v)} />
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Bio — Paragraph 1</label>
          <textarea value={c.about_bio_1 || ''} onChange={(e) => set('about_bio_1', e.target.value)} rows={4} className={`${inputClass} resize-none`} />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Bio — Paragraph 2</label>
          <textarea value={c.about_bio_2 || ''} onChange={(e) => set('about_bio_2', e.target.value)} rows={4} className={`${inputClass} resize-none`} />
        </div>
      </Section>

      {/* Contact info */}
      <Section title="Contact Information" onSave={() => saveSection(['contact_phone', 'contact_email', 'contact_address', 'contact_hours'])} saving={st('contact_phone').saving} saved={st('contact_phone').saved}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Phone</label>
            <input type="text" value={c.contact_phone || ''} onChange={(e) => set('contact_phone', e.target.value)} className={inputClass} placeholder="+1 (234) 567-8900" />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Email</label>
            <input type="email" value={c.contact_email || ''} onChange={(e) => set('contact_email', e.target.value)} className={inputClass} placeholder="olivia@example.com" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Office Address</label>
          <textarea value={c.contact_address || ''} onChange={(e) => set('contact_address', e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="1234 Main Street, Suite 500&#10;Los Angeles, CA 90015" />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Office Hours</label>
          <textarea value={c.contact_hours || ''} onChange={(e) => set('contact_hours', e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Monday – Friday&#10;9:00 AM – 6:00 PM" />
        </div>
      </Section>

      {/* Social links */}
      <Section title="Social Media Links" onSave={() => saveSection(['social_instagram', 'social_facebook', 'social_youtube'])} saving={st('social_instagram').saving} saved={st('social_instagram').saved}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Instagram URL</label>
            <input type="url" value={c.social_instagram || ''} onChange={(e) => set('social_instagram', e.target.value)} className={inputClass} placeholder="https://instagram.com/..." />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Facebook URL</label>
            <input type="url" value={c.social_facebook || ''} onChange={(e) => set('social_facebook', e.target.value)} className={inputClass} placeholder="https://facebook.com/..." />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>YouTube URL</label>
            <input type="url" value={c.social_youtube || ''} onChange={(e) => set('social_youtube', e.target.value)} className={inputClass} placeholder="https://youtube.com/..." />
          </div>
        </div>
      </Section>

    </div>
  )
}
