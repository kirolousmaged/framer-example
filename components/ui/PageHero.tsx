'use client'
import { motion } from 'framer-motion'

interface PageHeroProps {
  preTitle: string
  title: string
  image: string
}

export default function PageHero({ preTitle, title, image }: PageHeroProps) {
  return (
    <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <motion.div
        className="relative z-10 mx-auto w-[90%] max-w-screen-xl pb-14 flex flex-col gap-3"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="font-raleway text-sm uppercase tracking-widest text-white/60">{preTitle}</p>
        <h1 className="font-italiana text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
          {title}
        </h1>
      </motion.div>
    </section>
  )
}
