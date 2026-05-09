'use client'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import PropertyCard from './PropertyCard'
import Button from './Button'

// Seed data — replace with CMS/API data in production
const properties = [
  {
    id: '1',
    title: '1 Ocean Drive, Miami Beach, FL',
    beds: 6,
    baths: 3.5,
    sqft: '3,600 SQ.FT',
    price: '$8,750,000',
    image: 'https://framerusercontent.com/images/XHjb2nvN3Jd2DDPrmmf2kYt3IM.jpg',
    href: '/featured-properties/ocean-drive',
    status: 'For Sale' as const,
  },
  {
    id: '2',
    title: 'Luxury Estate in Beverly Hills',
    beds: 5,
    baths: 4,
    sqft: '5,200 SQ.FT',
    price: '$12,500,000',
    image: 'https://framerusercontent.com/images/1DvKVpy6gPlZtL3SpcE6uWTvxA.jpg',
    href: '/featured-properties/beverly-hills',
    status: 'Sold' as const,
  },
  {
    id: '3',
    title: 'Modern Villa, Malibu Cove',
    beds: 4,
    baths: 3,
    sqft: '3,100 SQ.FT',
    price: '$6,200,000',
    image: 'https://framerusercontent.com/images/4207UCMpGfd1yz62fn7VkACtag.jpg',
    href: '/featured-properties/malibu-cove',
    status: 'For Sale' as const,
  },
]

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

export default function FeaturedListings() {
  return (
    <section className="bg-white py-28 md:py-32">
      <div className="mx-auto w-[90%] max-w-screen-xl flex flex-col gap-12">
        <SectionHeader
          preTitle="Handpicked Just for You"
          title="Featured Listings"
          alignment="left"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {properties.map((property) => (
            <motion.div key={property.id} variants={cardVariants}>
              <PropertyCard {...property} />
            </motion.div>
          ))}
        </motion.div>

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
