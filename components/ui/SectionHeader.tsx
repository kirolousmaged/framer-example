'use client'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
  preTitle: string
  title: string
  alignment?: 'left' | 'center'
  light?: boolean
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export default function SectionHeader({
  preTitle,
  title,
  alignment = 'center',
  light = false,
}: SectionHeaderProps) {
  const alignClass = alignment === 'center' ? 'items-center text-center' : 'items-start text-left'
  const colorClass = light ? 'text-white' : 'text-off-black'

  return (
    <motion.div
      className={`flex flex-col gap-1.5 ${alignClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      <motion.p
        variants={fadeUp}
        className={`font-raleway text-xl uppercase tracking-widest ${colorClass} opacity-70`}
      >
        {preTitle}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className={`font-italiana text-5xl md:text-6xl lg:text-7xl leading-tight ${colorClass}`}
      >
        {title}
      </motion.h2>
    </motion.div>
  )
}
