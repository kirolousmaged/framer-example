'use client'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import PropertyCard from './PropertyCard'
import Button from './Button'
import type { Property } from '@/lib/data'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export default function FeaturedListings({ properties }: { properties: Property[] }) {
  const displayed = properties.slice(0, 3)

  return (
    <section className="bg-white py-28 md:py-32">
      <div className="mx-auto w-[90%] max-w-screen-xl flex flex-col gap-12">
        <SectionHeader
          preTitle="Handpicked Just for You"
          title="Featured Listings"
          alignment="left"
        />

        {displayed.length === 0 ? (
          <p className="font-raleway text-center text-off-black/40 py-12">
            No listings available yet.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
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
                  status={property.status}
                  href={`/featured-properties/${property.slug}`}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="flex justify-center">
          <Button
            label="View All"
            href="/featured-properties"
            variant="filled"
            colorScheme="accent"
          />
        </div>
      </div>
    </section>
  )
}
