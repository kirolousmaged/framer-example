import { getPosts } from '@/lib/data'
import PageHero from '@/components/ui/PageHero'
import BlogCard from '@/components/ui/BlogCard'

export const dynamic = 'force-dynamic'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPage() {
  const posts = await getPosts(true)

  return (
    <>
      <PageHero
        preTitle="Latest Insights & Market Trends"
        title="Blog"
        image="https://framerusercontent.com/images/XHjb2nvN3Jd2DDPrmmf2kYt3IM.jpg"
      />
      <section className="bg-off-white py-24 md:py-28">
        <div className="mx-auto w-[90%] max-w-screen-xl">
          {posts.length === 0 ? (
            <p className="font-raleway text-center text-off-black/40 py-16">
              No posts published yet. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  date={formatDate(post.createdAt)}
                  title={post.title}
                  href={`/blog/${post.slug}`}
                  image={post.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
