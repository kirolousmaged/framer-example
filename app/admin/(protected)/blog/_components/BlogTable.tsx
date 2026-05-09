'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Post } from '@/lib/data'

export default function BlogTable({ posts: initial }: { posts: Post[] }) {
  const router = useRouter()
  const [posts, setPosts] = useState(initial)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    setDeleting(id)
    await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    setPosts((prev) => prev.filter((p) => p.id !== id))
    setDeleting(null)
    router.refresh()
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white border border-gray-100 p-12 text-center">
        <p className="font-raleway text-sm text-off-black/40">
          No blog posts yet. Create your first post.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left px-6 py-4 font-montserrat text-xs text-off-black/50 uppercase tracking-wider">
              Title
            </th>
            <th className="text-left px-6 py-4 font-montserrat text-xs text-off-black/50 uppercase tracking-wider hidden md:table-cell">
              Status
            </th>
            <th className="text-left px-6 py-4 font-montserrat text-xs text-off-black/50 uppercase tracking-wider hidden lg:table-cell">
              Date
            </th>
            <th className="px-6 py-4" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-raleway text-sm text-off-black font-medium line-clamp-1">
                    {post.title}
                  </span>
                  <span className="font-raleway text-xs text-off-black/40">/blog/{post.slug}</span>
                </div>
              </td>
              <td className="px-6 py-4 hidden md:table-cell">
                <span
                  className={`inline-block text-xs font-montserrat font-medium px-2.5 py-1 ${
                    post.published
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-6 py-4 hidden lg:table-cell">
                <span className="font-raleway text-xs text-off-black/50">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 text-off-black/40 hover:text-off-black transition-colors"
                      title="View post"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </Link>
                  )}
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="p-2 text-off-black/40 hover:text-off-black transition-colors"
                    title="Edit post"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting === post.id}
                    className="p-2 text-off-black/40 hover:text-red-500 transition-colors disabled:opacity-40"
                    title="Delete post"
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
