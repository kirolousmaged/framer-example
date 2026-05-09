import { getPost, getPosts } from '@/lib/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getPosts(true)
  return posts.map((p) => ({ slug: p.slug }))
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post || !post.published) notFound()

  return (
    <article className="bg-white">
      {post.image && (
        <div className="relative w-full aspect-[21/9] max-h-[520px] overflow-hidden bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <div className="mx-auto w-[90%] max-w-screen-md py-16 md:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-raleway text-sm text-off-black/50 hover:text-accent transition-colors mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Blog
        </Link>

        <p className="font-montserrat text-xs text-off-black/50 uppercase tracking-widest mb-4">
          {formatDate(post.createdAt)}
        </p>
        <h1 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-off-black leading-tight mb-8">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="font-raleway text-lg text-off-black/60 leading-relaxed mb-10 border-l-4 border-accent pl-5">
            {post.excerpt}
          </p>
        )}

        <div className="font-raleway text-base text-off-black/80 leading-relaxed flex flex-col gap-5">
          {post.content.split('\n\n').filter(Boolean).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
