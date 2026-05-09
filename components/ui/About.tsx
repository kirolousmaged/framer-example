'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from './Button'

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export default function About() {
  return (
    <section className="bg-off-white py-24 md:py-32">
      <div className="mx-auto w-[90%] max-w-screen-xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text column */}
          <motion.div
            className="flex flex-col gap-8 lg:flex-[1_1_0] min-w-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeLeft}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <p className="font-raleway text-xl uppercase tracking-widest text-off-black/70">
                  About me
                </p>
                <h2 className="font-italiana text-5xl md:text-6xl lg:text-7xl leading-tight text-off-black">
                  About Olivia
                </h2>
              </div>
              <p className="font-raleway text-lg text-off-black/[0.67] leading-relaxed max-w-md">
                Olivia Foster has always been driven by a deep interest in architecture and design,
                which led her to pursue a career in real estate. After earning a degree in Real
                Estate &amp; Property Management from the University of California, Berkeley, she
                immediately immersed herself in the industry, gaining valuable experience with top
                agencies in the region.
              </p>
            </div>
            <Button label="Learn More" href="/about" variant="filled" colorScheme="accent" />
          </motion.div>

          {/* Image column */}
          <motion.div
            className="relative lg:flex-[1_1_0] min-w-0 w-full lg:min-w-[550px] min-h-[500px] lg:min-h-[600px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeRight}
          >
            <Image
              src="https://framerusercontent.com/images/1DvKVpy6gPlZtL3SpcE6uWTvxA.jpg"
              alt="Olivia Sinclair"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
