import Link from 'next/link'
import { getPosts } from '@/lib/data'
import BlogTable from './_components/BlogTable'

export const dynamic = 'force-dynamic'

export default async function AdminBlogPage() {
  const posts = await getPosts()

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-italiana text-4xl text-off-black">Blog</h1>
          <p className="font-raleway text-sm text-off-black/50 mt-1">
            {posts.length} post{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-5 py-3 bg-accent text-white font-raleway text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Post
        </Link>
      </div>

      <BlogTable posts={posts} />
    </div>
  )
}
