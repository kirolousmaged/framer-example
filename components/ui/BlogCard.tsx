'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  date: string
  title: string
  href: string
  image?: string
}

export default function BlogCard({ date, title, href, image }: BlogCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
      <Link href={href} className="group block">
        {image && (
          <div className="relative w-full aspect-video overflow-hidden mb-5">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
        <div className="flex flex-col gap-3">
          <span className="font-montserrat text-xs text-off-black/50 uppercase tracking-widest">
            {date}
          </span>
          <h3 className="font-raleway font-medium text-xl md:text-2xl text-off-black leading-snug group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>
          <span className="inline-flex items-center gap-2 font-raleway font-bold text-sm text-accent uppercase tracking-wide group-hover:gap-3 transition-all duration-200">
            Read More
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
