'use client'
import { motion } from 'framer-motion'
import Button from './Button'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.4 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

interface HeroProps {
  subtitle?: string
  tagline?: string
  bgImage?: string
}

export default function Hero({
  subtitle = 'Your Next Move Starts Here',
  tagline = 'California Real Estate',
  bgImage = 'https://framerusercontent.com/images/XHjb2nvN3Jd2DDPrmmf2kYt3IM.jpg',
}: HeroProps) {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-[90%] max-w-screen-xl">
          <motion.div
            className="flex flex-col items-center gap-16 pt-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col items-center gap-8 w-full">
              <motion.p
                variants={itemVariants}
                className="font-raleway text-xl uppercase tracking-widest text-white/[0.67] text-center"
              >
                {subtitle}
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="font-italiana text-6xl md:text-8xl xl:text-[11.25rem] leading-none text-white w-full text-center"
              >
                Olivia Sinclair
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="font-raleway text-2xl md:text-3xl text-white/[0.67] text-center w-full"
              >
                {tagline}
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <Button label="View Properties" href="/featured-properties" variant="filled" colorScheme="white" />
              <Button label="Let's Connect" href="/contact" variant="border" colorScheme="white" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-10 flex justify-center pb-10 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 8 5 5 5-5" />
            <path d="m7 13 5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
