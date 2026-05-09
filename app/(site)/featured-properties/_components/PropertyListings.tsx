'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PropertyCard from '@/components/ui/PropertyCard'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Property } from '@/lib/data'

type FilterStatus = 'All' | 'For Sale' | 'Sold'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export default function PropertyListings({ properties }: { properties: Property[] }) {
  const [filter, setFilter] = useState<FilterStatus>('All')
  const displayed =
    filter === 'All' ? properties : properties.filter((p) => p.status === filter)

  return (
    <section className="bg-white py-24 md:py-28">
      <div className="mx-auto w-[90%] max-w-screen-xl flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <SectionHeader
            preTitle="Handpicked Just for You"
            title="All Listings"
            alignment="left"
          />
          <div className="flex gap-2 flex-wrap flex-shrink-0">
            {(['All', 'For Sale', 'Sold'] as FilterStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-5 py-2 font-raleway text-sm font-medium transition-colors duration-200 ${
                  filter === status
                    ? 'bg-accent text-white'
                    : 'border border-gray-200 text-off-black/60 hover:border-accent hover:text-accent'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={filter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayed.map((property) => (
            <motion.div key={property.id} variants={cardVariants}>
              <PropertyCard
                title={property.title}
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
                price={property.price}
                image={property.image}
                href={`/featured-properties/${property.slug}`}
                status={property.status}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
