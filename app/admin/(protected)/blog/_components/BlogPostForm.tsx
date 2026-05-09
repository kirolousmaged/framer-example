'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Post } from '@/lib/data'

type FormValues = Omit<Post, 'id' | 'createdAt'>

interface BlogPostFormProps {
  initialValues?: Partial<FormValues>
  postId?: string
}

const defaultValues: FormValues = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  published: false,
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function BlogPostForm({ initialValues, postId }: BlogPostFormProps) {
  const router = useRouter()
  const isEdit = Boolean(postId)
  const [form, setForm] = useState<FormValues>({ ...defaultValues, ...initialValues })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const imageRef = useRef<HTMLInputElement>(null)

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    return data.url as string
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }
      if (name === 'title' && !isEdit) {
        updated.slug = slugify(value)
      }
      return updated
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const url = isEdit ? `/api/blog/${postId}` : '/api/blog'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (res.ok) {
      router.refresh()
      router.push('/admin/blog')
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
        <h2 className="font-raleway font-medium text-off-black">Post Details</h2>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Top 5 Neighborhoods in Los Angeles"
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
              placeholder="top-5-neighborhoods-los-angeles"
              className={inputClass}
            />
            <p className="font-raleway text-xs text-off-black/40">
              URL: /blog/{form.slug || '...'}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={2}
              placeholder="Short description shown in blog cards and SEO..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={14}
              placeholder="Write your post content here. Use double line breaks for new paragraphs."
              className={`${inputClass} resize-y`}
            />
            <p className="font-raleway text-xs text-off-black/40">
              Separate paragraphs with a blank line.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 p-8 flex flex-col gap-6">
        <h2 className="font-raleway font-medium text-off-black">Cover Image</h2>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Image URL</label>
          <div className="flex gap-3">
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => imageRef.current?.click()}
              disabled={uploading}
              className="flex-shrink-0 px-4 py-3 border border-gray-200 text-off-black/60 font-raleway text-sm hover:border-off-black hover:text-off-black transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {uploading ? 'Uploading…' : 'Upload'}
            </button>
            <input
              ref={imageRef}
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
            <div className="relative w-full max-w-sm aspect-video overflow-hidden mt-2 bg-gray-100">
              <Image src={form.image} alt="Preview" fill className="object-cover" sizes="384px" onError={() => {}} />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-100 p-8">
        <label className="flex items-center gap-3 cursor-pointer w-fit">
          <input
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={handleChange}
            className="w-4 h-4 accent-accent"
          />
          <span className="font-raleway text-sm text-off-black">
            Published — visible on the public blog
          </span>
        </label>
      </div>

      {error && <p className="font-raleway text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors duration-200 disabled:opacity-60"
        >
          {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/blog')}
          className="px-8 py-3.5 border border-gray-200 text-off-black/60 font-raleway text-sm hover:border-off-black hover:text-off-black transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
