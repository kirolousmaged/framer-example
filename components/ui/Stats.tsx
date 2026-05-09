'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import SectionHeader from './SectionHeader'

interface StatItem {
  from: number
  to: number
  suffix: string
  prefix?: string
  label: string
}

const statsData: StatItem[] = [
  { from: 0, to: 500, suffix: '+', label: 'Transactions Closed' },
  { from: 0, to: 10, suffix: '+', label: 'Years of Experience' },
  { from: 0, to: 300, suffix: 'M+', prefix: '$', label: 'in Properties Sold' },
]

function CounterStat({ stat, isInView }: { stat: StatItem; isInView: boolean }) {
  const motionValue = useMotionValue(stat.from)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(motionValue, stat.to, { duration: 2.2, ease: 'easeOut' })
    return controls.stop
  }, [isInView, motionValue, stat.to])

  useEffect(() => {
    return motionValue.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${stat.prefix ?? ''}${Math.round(v)}${stat.suffix}`
      }
    })
  }, [motionValue, stat])

  return (
    <motion.div
      className="flex flex-col items-center gap-3 min-w-[180px]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span
        ref={ref}
        className="font-italiana text-6xl md:text-7xl text-white leading-none"
      >
        {stat.prefix ?? ''}0{stat.suffix}
      </span>
      <p className="font-raleway text-base text-white/80 text-center tracking-wide">
        {stat.label}
      </p>
    </motion.div>
  )
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' })

  return (
    <section
      ref={sectionRef}
      className="relative py-44 md:py-52 flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url(https://framerusercontent.com/images/4207UCMpGfd1yz62fn7VkACtag.jpg)',
        }}
      />
      {/* Overlay — 50% opacity */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-[90%] max-w-screen-xl flex flex-col items-center gap-12">
        <SectionHeader
          preTitle="Why Choose Us?"
          title="More Than a Real Estate Agent"
          light
        />

        <div className="flex flex-wrap justify-center gap-16 md:gap-20 w-full">
          {statsData.map((stat) => (
            <CounterStat key={stat.label} stat={stat} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
