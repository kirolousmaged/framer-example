'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

const inputClass =
  'w-full px-4 py-3 border border-gray-200 font-raleway text-sm text-off-black placeholder:text-off-black/40 focus:outline-none focus:border-accent transition-colors duration-200 bg-white'

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start gap-5 py-10"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <p className="font-raleway font-medium text-off-black">Message Sent</p>
          </div>
          <p className="font-raleway text-off-black/70 leading-relaxed">
            Thank you for reaching out! I&apos;ll be in touch within 24 hours.
          </p>
          <button
            onClick={() => {
              setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' })
              setSubmitted(false)
            }}
            className="font-raleway text-sm text-accent font-medium hover:opacity-70 transition-opacity underline underline-offset-4"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (optional)"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
          <textarea
            name="message"
            placeholder="Your message..."
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors duration-200 self-start disabled:opacity-60"
          >
            {loading ? 'Sending…' : 'Send Message'}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
