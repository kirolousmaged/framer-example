'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeader from './SectionHeader'

const cards = [
  {
    title: 'Our Properties',
    description: 'Browse our curated collection of premium California properties.',
    href: '/featured-properties',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Past Transactions',
    description: 'Explore our track record of successful real estate transactions.',
    href: '/past-transactions',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Let's Connect",
    description: 'Ready to find your perfect home? Get in touch with Olivia today.',
    href: '/contact',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

export default function SolutionsMenu() {
  return (
    <section className="bg-white py-28 md:py-32">
      <div className="mx-auto w-[90%] max-w-screen-xl flex flex-col items-center gap-12">
        <SectionHeader preTitle="How Can We Help?" title="Explore Our Solutions" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Link
                href={card.href}
                className="group flex flex-col gap-6 p-8 border border-gray-100 hover:border-accent hover:shadow-md transition-all duration-300 h-full"
              >
                <span className="text-accent group-hover:scale-110 transition-transform duration-300 inline-block">
                  {card.icon}
                </span>
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="font-italiana text-3xl text-off-black">{card.title}</h3>
                  <p className="font-raleway text-base text-off-black/70 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <span className="flex items-center gap-2 font-raleway font-bold text-sm text-accent uppercase tracking-wide group-hover:gap-3 transition-all duration-200">
                  Explore
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
