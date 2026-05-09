'use client'
import { motion } from 'framer-motion'
import Button from './Button'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export default function CTA() {
  return (
    <section className="relative py-44 md:py-52 flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://framerusercontent.com/images/T5pE9MEqzmIpPCbew88PF6J2YxI.jpg)',
        }}
      />
      {/* Overlay — 40% opacity */}
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        className="relative z-10 w-[90%] max-w-screen-xl flex flex-col items-center gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Title */}
        <motion.div className="flex flex-col items-center gap-1.5" variants={itemVariants}>
          <p className="font-raleway text-xl uppercase tracking-widest text-white/[0.67] text-center">
            Find Your Dream Home Today
          </p>
          <h2 className="font-italiana text-5xl md:text-6xl lg:text-7xl text-white text-center leading-tight">
            Buy, Sell &amp; Rent Easily
          </h2>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          variants={itemVariants}
        >
          <Button label="Let's Connect" href="/contact" variant="filled" colorScheme="white" />
          <Button
            label="View Properties"
            href="/featured-properties"
            variant="border"
            colorScheme="white"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
