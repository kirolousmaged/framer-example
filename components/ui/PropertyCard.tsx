'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface PropertyCardProps {
  title: string
  beds: number
  baths: number
  sqft: string
  price: string
  image: string
  href: string
  status?: 'For Sale' | 'Sold'
}

export default function PropertyCard({
  title,
  beds,
  baths,
  sqft,
  price,
  image,
  href,
  status = 'For Sale',
}: PropertyCardProps) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
      <Link href={href} className="group block overflow-hidden">
        {/* Image — aspect-[3/4] to match ~485px tall card in Framer */}
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span
            className={`absolute top-3 right-3 text-xs font-montserrat font-medium px-3 py-1 ${
              status === 'Sold' ? 'bg-off-black text-white' : 'bg-accent text-white'
            }`}
          >
            {status}
          </span>
        </div>

        {/* Content */}
        <div className="pt-6 pl-3 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-raleway font-medium text-2xl text-off-black leading-snug">
              {title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-montserrat font-medium text-sm text-off-black/60">
                {beds} Bed
              </span>
              <span className="text-off-black/30 text-xs">·</span>
              <span className="font-montserrat font-medium text-sm text-off-black/60">
                {baths} Bath
              </span>
              <span className="text-off-black/30 text-xs">·</span>
              <span className="font-montserrat font-medium text-sm text-off-black/60">
                {sqft}
              </span>
            </div>
          </div>
          <p className="font-raleway font-medium text-2xl text-off-black">{price}</p>
        </div>
      </Link>
    </motion.div>
  )
}
