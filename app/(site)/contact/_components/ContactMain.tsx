'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import ContactForm from '@/components/ui/ContactForm'

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}
const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

interface ContactMainProps {
  phone: string
  email: string
  address: string
  hours: string
}

export default function ContactMain({ phone, email, address, hours }: ContactMainProps) {
  const contactDetails = [
    {
      label: 'Phone',
      value: phone,
      href: `tel:${phone.replace(/\D/g, '')}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: 'Address',
      value: address,
      href: null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: 'Office Hours',
      value: hours,
      href: null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ]

  return (
    <section className="bg-off-white py-24 md:py-32">
      <div className="mx-auto w-[90%] max-w-screen-xl">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <motion.div
            className="flex flex-col gap-10 flex-1 min-w-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeLeft}
          >
            <SectionHeader preTitle="Get in Touch" title="Send a Message" alignment="left" />
            <ContactForm />
          </motion.div>

          <motion.div
            className="flex flex-col gap-10 lg:w-5/12 flex-shrink-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeRight}
          >
            <ul className="flex flex-col gap-6">
              {contactDetails.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="mt-0.5 text-accent flex-shrink-0">{item.icon}</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-montserrat font-semibold text-xs text-off-black uppercase tracking-wider">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="font-raleway text-sm text-off-black/70 hover:text-accent transition-colors whitespace-pre-line">
                        {item.value}
                      </a>
                    ) : (
                      <span className="font-raleway text-sm text-off-black/70 whitespace-pre-line">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src="https://framerusercontent.com/images/4207UCMpGfd1yz62fn7VkACtag.jpg"
                alt="Olivia Sinclair office"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
