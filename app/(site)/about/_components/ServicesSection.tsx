'use client'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const services = [
  {
    title: 'Buyer Representation',
    description: 'From your first showing to the moment you receive the keys, I guide you through every step — searches, negotiations, inspections, and closing — so you can buy with confidence.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Seller Representation',
    description: 'I leverage deep market knowledge, strategic pricing, and premium marketing to attract the right buyers and achieve maximum value for your property.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Investment Advisory',
    description: "Whether you're expanding your portfolio or entering real estate investment for the first time, I provide data-driven analysis to help you identify high-value opportunities.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-white py-24 md:py-28">
      <div className="mx-auto w-[90%] max-w-screen-xl flex flex-col items-center gap-16">
        <SectionHeader preTitle="What I Offer" title="How I Can Help" />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="flex flex-col gap-5 p-8 border border-gray-100 hover:border-accent hover:shadow-md transition-all duration-300"
            >
              <span className="text-accent">{service.icon}</span>
              <h3 className="font-raleway font-medium text-xl text-off-black">{service.title}</h3>
              <p className="font-raleway text-sm text-off-black/60 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
