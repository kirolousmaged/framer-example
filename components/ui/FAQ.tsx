'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from './SectionHeader'
import Button from './Button'
import type { Faq } from '@/lib/data'

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: Faq
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left gap-4 group"
        aria-expanded={isOpen}
      >
        <span className="font-raleway font-medium text-lg md:text-xl text-off-black group-hover:text-accent transition-colors duration-200">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-accent"
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="font-raleway text-base text-off-black/70 leading-relaxed pb-6">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (faqs.length === 0) return null

  return (
    <section className="bg-white py-32 md:py-36">
      <div className="mx-auto w-[90%] max-w-screen-xl">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-5/12 flex-shrink-0">
              <SectionHeader preTitle="FAQ's" title="Frequently Asked Questions" alignment="left" />
            </div>

            <motion.div
              className="flex-1 min-w-0 lg:min-w-[500px]"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.id}
                  item={faq}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center">
            <Button label="See All FAQs" href="/faqs" variant="filled" colorScheme="accent" />
          </div>
        </div>
      </div>
    </section>
  )
}
