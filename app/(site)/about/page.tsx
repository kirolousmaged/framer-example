'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import PageHero from '@/components/ui/PageHero'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import Stats from '@/components/ui/Stats'
import Testimonials from '@/components/ui/Testimonials'
import CTA from '@/components/ui/CTA'

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const services = [
  {
    title: 'Buyer Representation',
    description:
      'From your first showing to the moment you receive the keys, I guide you through every step — searches, negotiations, inspections, and closing — so you can buy with confidence.',
    icon: (
      <svg
        width="24"
        height="24"
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
    title: 'Seller Representation',
    description:
      'I leverage deep market knowledge, strategic pricing, and premium marketing to attract the right buyers and achieve maximum value for your property.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Investment Advisory',
    description:
      "Whether you're expanding your portfolio or entering real estate investment for the first time, I provide data-driven analysis to help you identify high-value opportunities.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        preTitle="Get to Know"
        title="About Olivia"
        image="https://framerusercontent.com/images/T5pE9MEqzmIpPCbew88PF6J2YxI.jpg"
      />

      {/* Bio section */}
      <section className="bg-off-white py-24 md:py-32">
        <div className="mx-auto w-[90%] max-w-screen-xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
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
                    The Story So Far
                  </h2>
                </div>
                <p className="font-raleway text-lg text-off-black/[0.67] leading-relaxed">
                  Olivia Sinclair has always been driven by a deep interest in architecture and
                  design, which led her to pursue a career in real estate. After earning a degree in
                  Real Estate &amp; Property Management from UC Berkeley, she immersed herself in
                  California&apos;s most prestigious markets.
                </p>
                <p className="font-raleway text-lg text-off-black/[0.67] leading-relaxed">
                  Over a decade later, Olivia has closed more than $300 million in transactions
                  across Los Angeles and the surrounding areas. She is known for her meticulous
                  attention to detail, sharp negotiation skills, and genuine dedication to her
                  clients&apos; goals — whether buying a first home or selling a multi-million
                  dollar estate.
                </p>
              </div>
              <Button label="Let's Connect" href="/contact" variant="filled" colorScheme="accent" />
            </motion.div>

            <motion.div
              className="relative lg:flex-[1_1_0] min-w-0 w-full lg:min-w-[550px] min-h-[500px] lg:min-h-[620px]"
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

      <Stats />

      {/* Services section */}
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
                <p className="font-raleway text-sm text-off-black/60 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </>
  )
}
