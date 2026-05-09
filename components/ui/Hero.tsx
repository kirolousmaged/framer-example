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

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://framerusercontent.com/images/XHjb2nvN3Jd2DDPrmmf2kYt3IM.jpg)',
        }}
      />
      {/* Dark overlay — 55% opacity to match Framer */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content wrapper — flex-1 keeps it vertically centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-[90%] max-w-screen-xl">
          <motion.div
            className="flex flex-col items-center gap-16 pt-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Title stack */}
            <div className="flex flex-col items-center gap-8 w-full">
              <motion.p
                variants={itemVariants}
                className="font-raleway text-xl uppercase tracking-widest text-white/[0.67] text-center"
              >
                Your Next Move Starts Here
              </motion.p>

              {/* Heading 1 — Italiana 180px desktop, responsive down */}
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
                California Real Estate
              </motion.p>
            </div>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <Button
                label="View Properties"
                href="/featured-properties"
                variant="filled"
                colorScheme="white"
              />
              <Button
                label="Let's Connect"
                href="/contact"
                variant="border"
                colorScheme="white"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — in flow at the bottom, never overlaps buttons */}
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
          <svg
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 8 5 5 5-5" />
            <path d="m7 13 5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
