'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'

const PROPERTY_TYPES = ['House', 'Apartment', 'Condo', 'Villa', 'Land', 'Commercial']

const defaultForm = {
  name: '',
  email: '',
  phone: '',
  propertyTitle: '',
  address: '',
  propertyType: 'House',
  beds: '',
  baths: '',
  sqft: '',
  askingPrice: '',
  description: '',
  images: [] as string[],
}

export default function SubmitPropertyForm() {
  const [form, setForm] = useState(defaultForm)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const labelClass = 'font-montserrat text-xs text-off-black uppercase tracking-wider'
  const inputClass =
    'w-full px-4 py-3 border border-gray-200 font-raleway text-sm text-off-black focus:outline-none focus:border-accent transition-colors bg-white'

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    return data.url as string
  }

  function removeImage(index: number) {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        beds: Number(form.beds) || 0,
        baths: Number(form.baths) || 0,
      }),
    })
    setLoading(false)
    if (res.ok) {
      setSubmitted(true)
    } else {
      setError('Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="bg-white border border-gray-100 p-12 flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-italiana text-3xl text-off-black">Request Received</h3>
        <p className="font-raleway text-off-black/60 max-w-sm">
          Thank you for submitting your property. Our team will review your request and get in touch within 24–48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Seller info */}
      <div className="bg-white border border-gray-100 p-8 flex flex-col gap-6">
        <h2 className="font-raleway font-medium text-off-black">Your Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className={labelClass}>Full Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith" className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Email Address *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com" className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Phone Number</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputClass} />
          </div>
        </div>
      </div>

      {/* Property details */}
      <div className="bg-white border border-gray-100 p-8 flex flex-col gap-6">
        <h2 className="font-raleway font-medium text-off-black">Property Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className={labelClass}>Property Title *</label>
            <input type="text" name="propertyTitle" value={form.propertyTitle} onChange={handleChange} required placeholder="e.g. 3 Bed House in Miami Beach" className={inputClass} />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className={labelClass}>Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="123 Ocean Drive, Miami Beach, FL" className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Property Type *</label>
            <select name="propertyType" value={form.propertyType} onChange={handleChange} className={inputClass}>
              {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Asking Price *</label>
            <input type="text" name="askingPrice" value={form.askingPrice} onChange={handleChange} required placeholder="$1,250,000" className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Bedrooms</label>
            <input type="number" name="beds" value={form.beds} onChange={handleChange} min={0} step={1} placeholder="3" className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Bathrooms</label>
            <input type="number" name="baths" value={form.baths} onChange={handleChange} min={0} step={0.5} placeholder="2" className={inputClass} />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className={labelClass}>Square Footage</label>
            <input type="text" name="sqft" value={form.sqft} onChange={handleChange} placeholder="2,400 SQ.FT" className={inputClass} />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className={labelClass}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Describe your property — key features, condition, recent renovations..." className={`${inputClass} resize-none`} />
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white border border-gray-100 p-8 flex flex-col gap-6">
        <h2 className="font-raleway font-medium text-off-black">Photos</h2>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full py-10 border-2 border-dashed border-gray-200 hover:border-accent transition-colors flex flex-col items-center gap-2 text-off-black/40 hover:text-accent disabled:opacity-50"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="font-raleway text-sm">{uploading ? 'Uploading…' : 'Click to upload photos'}</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={async (e) => {
              const files = Array.from(e.target.files ?? [])
              if (!files.length) return
              setUploading(true)
              for (const file of files) {
                const url = await uploadFile(file)
                setForm((prev) => ({ ...prev, images: [...prev.images, url] }))
              }
              setUploading(false)
              e.target.value = ''
            }}
          />
          {form.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {form.images.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] bg-gray-100 group overflow-hidden">
                  <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover" sizes="200px" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-accent/5 border border-accent/20 px-6 py-4">
        <p className="font-raleway text-sm text-off-black/70 leading-relaxed">
          <strong className="text-off-black">Important:</strong> By submitting this form, you agree that all buyer inquiries and negotiations will be handled exclusively through Olivia Sinclair Real Estate. Your contact details will remain confidential and will never be shared with potential buyers directly.
        </p>
      </div>

      {error && <p className="font-raleway text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="px-10 py-4 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors duration-200 disabled:opacity-60 w-full md:w-auto"
      >
        {loading ? 'Submitting…' : 'Submit Property'}
      </button>
    </form>
  )
}
