'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Property } from '@/lib/data'

type FormValues = Omit<Property, 'id' | 'createdAt'>

interface PropertyFormProps {
  initialValues?: Partial<FormValues>
  propertyId?: string
}

const defaultValues: FormValues = {
  title: '',
  slug: '',
  beds: 3,
  baths: 2,
  sqft: '',
  price: '',
  image: '',
  gallery: [],
  status: 'For Sale',
  description: '',
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function PropertyForm({ initialValues, propertyId }: PropertyFormProps) {
  const router = useRouter()
  const isEdit = Boolean(propertyId)
  const [form, setForm] = useState<FormValues>({ ...defaultValues, ...initialValues })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [galleryInput, setGalleryInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const mainImageRef = useRef<HTMLInputElement>(null)
  const galleryFileRef = useRef<HTMLInputElement>(null)

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    return data.url as string
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => {
      const updated = { ...prev, [name]: name === 'beds' || name === 'baths' ? Number(value) : value }
      if (name === 'title' && !isEdit) {
        updated.slug = slugify(value)
      }
      return updated
    })
  }

  function addGalleryImage() {
    const url = galleryInput.trim()
    if (!url) return
    setForm((prev) => ({ ...prev, gallery: [...(prev.gallery ?? []), url] }))
    setGalleryInput('')
  }

  function removeGalleryImage(index: number) {
    setForm((prev) => ({ ...prev, gallery: (prev.gallery ?? []).filter((_, i) => i !== index) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const url = isEdit ? `/api/properties/${propertyId}` : '/api/properties'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (res.ok) {
      router.refresh()
      router.push('/admin/properties')
    } else {
      setError('Something went wrong. Please try again.')
    }
  }

  const labelClass = 'font-montserrat text-xs text-off-black uppercase tracking-wider'
  const inputClass =
    'w-full px-4 py-3 border border-gray-200 font-raleway text-sm text-off-black focus:outline-none focus:border-accent transition-colors bg-white'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="bg-white border border-gray-100 p-8 flex flex-col gap-6">
        <h2 className="font-raleway font-medium text-off-black">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className={labelClass}>Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. 1 Ocean Drive, Miami Beach"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Slug *</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              placeholder="ocean-drive"
              className={inputClass}
            />
            <p className="font-raleway text-xs text-off-black/40">
              URL: /featured-properties/{form.slug || '...'}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Price *</label>
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="$8,750,000"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Bedrooms *</label>
            <input
              type="number"
              name="beds"
              value={form.beds}
              onChange={handleChange}
              required
              min={0}
              step={1}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Bathrooms *</label>
            <input
              type="number"
              name="baths"
              value={form.baths}
              onChange={handleChange}
              required
              min={0}
              step={0.5}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Square Footage *</label>
            <input
              type="text"
              name="sqft"
              value={form.sqft}
              onChange={handleChange}
              required
              placeholder="3,600 SQ.FT"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Status *</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="For Sale">For Sale</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 p-8 flex flex-col gap-6">
        <h2 className="font-raleway font-medium text-off-black">Media &amp; Description</h2>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Image URL *</label>
          <div className="flex gap-3">
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              placeholder="https://..."
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => mainImageRef.current?.click()}
              disabled={uploading}
              className="flex-shrink-0 px-4 py-3 border border-gray-200 text-off-black/60 font-raleway text-sm hover:border-off-black hover:text-off-black transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {uploading ? 'Uploading…' : 'Upload'}
            </button>
            <input
              ref={mainImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setUploading(true)
                const url = await uploadFile(file)
                setForm((prev) => ({ ...prev, image: url }))
                setUploading(false)
              }}
            />
          </div>
          {form.image && (
            <div className="relative w-full max-w-sm aspect-[4/3] overflow-hidden mt-2 bg-gray-100">
              <Image src={form.image} alt="Preview" fill className="object-cover" sizes="384px" onError={() => {}} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Describe the property..."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white border border-gray-100 p-8 flex flex-col gap-6">
        <h2 className="font-raleway font-medium text-off-black">Photo Gallery</h2>

        {/* Add photo input */}
        <div className="flex gap-3">
          <input
            type="url"
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addGalleryImage() } }}
            placeholder="Paste image URL or upload a file"
            className={inputClass}
          />
          <button
            type="button"
            onClick={addGalleryImage}
            className="flex-shrink-0 px-5 py-3 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => galleryFileRef.current?.click()}
            disabled={uploading}
            className="flex-shrink-0 px-4 py-3 border border-gray-200 text-off-black/60 font-raleway text-sm hover:border-off-black hover:text-off-black transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {uploading ? '…' : 'Upload'}
          </button>
          <input
            ref={galleryFileRef}
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
                setForm((prev) => ({ ...prev, gallery: [...(prev.gallery ?? []), url] }))
              }
              setUploading(false)
              e.target.value = ''
            }}
          />
        </div>

        {/* Gallery grid */}
        {(form.gallery ?? []).length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {(form.gallery ?? []).map((src, i) => (
              <div key={i} className="relative aspect-[4/3] bg-gray-100 group overflow-hidden">
                <Image
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                  onError={() => {}}
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Remove photo"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-raleway text-sm text-off-black/40">No gallery photos yet. Paste URLs above to add them.</p>
        )}
      </div>

      {error && <p className="font-raleway text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors duration-200 disabled:opacity-60"
        >
          {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Property'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/properties')}
          className="px-8 py-3.5 border border-gray-200 text-off-black/60 font-raleway text-sm hover:border-off-black hover:text-off-black transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
