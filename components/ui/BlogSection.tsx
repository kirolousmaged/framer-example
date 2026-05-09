'use client'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import BlogCard from './BlogCard'
import Button from './Button'
import type { Post } from '@/lib/data'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogSection({ posts }: { posts: Post[] }) {
  const displayed = posts.slice(0, 3)

  if (displayed.length === 0) return null

  return (
    <section className="bg-off-white py-28 md:py-32">
      <div className="mx-auto w-[90%] max-w-screen-xl flex flex-col items-center gap-12">
        <SectionHeader
          preTitle="Latest Insights & Market Trends"
          title="Real Estate Tips & Expert Advice"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {displayed.map((post) => (
            <motion.div key={post.id} variants={cardVariants}>
              <BlogCard
                date={formatDate(post.createdAt)}
                title={post.title}
                href={`/blog/${post.slug}`}
                image={post.image}
              />
            </motion.div>
          ))}
        </motion.div>

        <Button label="View All" href="/blog" variant="filled" colorScheme="accent" />
      </div>
    </section>
  )
}
