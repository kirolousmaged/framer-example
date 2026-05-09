'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from './SectionHeader'

const testimonials = [
  {
    quote:
      '"She took the time to understand exactly what we wanted and found us a home that exceeded our expectations. Her market knowledge and negotiation skills helped us secure the property at a great price, even in a competitive market."',
    name: 'Emily Carter',
    role: 'Buyer',
  },
  {
    quote:
      '"As a growing family, we needed more space but weren\'t sure where to start. Olivia took the time to understand our needs and found us the perfect home in a wonderful neighborhood."',
    name: 'Sarah Thompson',
    role: 'Buyer',
  },
  {
    quote:
      '"I was worried about selling my home quickly while still getting a good price, but Olivia made it happen effortlessly. She guided me through staging, set up a strong marketing plan, and within days, we had multiple offers."',
    name: 'Daniel Rodriguez',
    role: 'Seller',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-off-white py-28 md:py-32">
      <div className="mx-auto w-[90%] max-w-screen-xl flex flex-col items-center gap-12">
        <SectionHeader preTitle="What Our Clients Say" title="Client Testimonials" />

        {/* Quote carousel */}
        <div className="w-full max-w-3xl min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <p className="font-italiana text-2xl md:text-3xl text-off-black leading-relaxed">
                {testimonials[active].quote}
              </p>
              <div className="flex flex-col items-center gap-1">
                <span className="font-raleway font-bold text-lg text-off-black">
                  {testimonials[active].name}
                </span>
                <span className="font-raleway text-sm text-off-black/60 uppercase tracking-widest">
                  {testimonials[active].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center gap-3" role="tablist" aria-label="Testimonials">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'bg-accent w-6' : 'bg-off-black/20 w-2 hover:bg-off-black/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
