'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

type ButtonVariant = 'filled' | 'border'
type ButtonColorScheme = 'accent' | 'white'

interface ButtonProps {
  label: string
  href: string
  variant?: ButtonVariant
  colorScheme?: ButtonColorScheme
  className?: string
}

const styles: Record<ButtonVariant, Record<ButtonColorScheme, string>> = {
  filled: {
    accent: 'bg-accent text-white hover:bg-accent-hover',
    white: 'bg-white text-off-black hover:bg-accent hover:text-white',
  },
  border: {
    white: 'border border-white text-white hover:bg-white hover:text-off-black',
    accent: 'border border-accent text-accent hover:bg-accent hover:text-white',
  },
}

export default function Button({
  label,
  href,
  variant = 'filled',
  colorScheme = 'accent',
  className = '',
}: ButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Link
        href={href}
        className={`inline-flex items-center justify-center px-8 py-4 font-raleway font-bold text-base tracking-wide rounded-full transition-all duration-300 ${styles[variant][colorScheme]} ${className}`}
      >
        {label}
      </Link>
    </motion.div>
  )
}
