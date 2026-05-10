'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Faq } from '@/lib/data'

export default function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={faq.id} className="border-b border-gray-200 last:border-none">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-7 text-left gap-6 group"
            aria-expanded={openIndex === i}
          >
            <span className="font-raleway font-medium text-lg md:text-xl text-off-black group-hover:text-accent transition-colors duration-200">
              {faq.question}
            </span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0 text-accent"
              aria-hidden
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <p className="font-raleway text-base md:text-lg text-off-black/70 leading-relaxed pb-7">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
