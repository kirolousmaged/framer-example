import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProperty, getProperties } from '@/lib/data'
import CTA from '@/components/ui/CTA'
import PropertyGallery from './_components/PropertyGallery'

export async function generateStaticParams() {
  const properties = await getProperties()
  return properties.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = await getProperty(slug)
  if (!property) return {}
  return {
    title: `${property.title} | Olivia Sinclair`,
    description: property.description,
  }
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = await getProperty(slug)
  if (!property) notFound()

  return (
    <>
      {/* Hero image */}
      <div className="relative w-full h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Back link */}
        <Link
          href="/featured-properties"
          className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-screen-xl flex items-center gap-2 font-raleway text-sm text-white/80 hover:text-white transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Properties
        </Link>

        {/* Status badge */}
        <span
          className={`absolute top-8 right-1/2 translate-x-1/2 mt-10 text-xs font-montserrat font-medium px-3 py-1 ${
            property.status === 'Sold' ? 'bg-off-black text-white' : 'bg-accent text-white'
          }`}
          style={{ right: 'auto', left: 'calc(50% + (90vw / 2) - 5rem)' }}
        />
      </div>

      {/* Content */}
      <section className="bg-off-white py-16 md:py-24">
        <div className="mx-auto w-[90%] max-w-screen-xl">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main info */}
            <div className="flex-1 min-w-0 flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-montserrat font-medium px-3 py-1 ${
                      property.status === 'Sold'
                        ? 'bg-off-black text-white'
                        : 'bg-accent text-white'
                    }`}
                  >
                    {property.status}
                  </span>
                </div>
                <h1 className="font-italiana text-4xl md:text-5xl lg:text-6xl text-off-black leading-tight">
                  {property.title}
                </h1>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 py-6 border-y border-gray-200">
                <div className="flex flex-col gap-1">
                  <span className="font-montserrat text-xs text-off-black/50 uppercase tracking-wider">
                    Bedrooms
                  </span>
                  <span className="font-raleway font-medium text-2xl text-off-black">
                    {property.beds}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-montserrat text-xs text-off-black/50 uppercase tracking-wider">
                    Bathrooms
                  </span>
                  <span className="font-raleway font-medium text-2xl text-off-black">
                    {property.baths}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-montserrat text-xs text-off-black/50 uppercase tracking-wider">
                    Size
                  </span>
                  <span className="font-raleway font-medium text-2xl text-off-black">
                    {property.sqft}
                  </span>
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-raleway font-medium text-xl text-off-black">
                    About This Property
                  </h2>
                  <p className="font-raleway text-off-black/70 leading-relaxed text-lg">
                    {property.description}
                  </p>
                </div>
              )}

              {/* Gallery */}
              <PropertyGallery images={property.gallery ?? []} />
            </div>

            {/* Price card */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-28 bg-white p-8 flex flex-col gap-6 border border-gray-100">
                <div className="flex flex-col gap-1">
                  <span className="font-montserrat text-xs text-off-black/50 uppercase tracking-wider">
                    Listing Price
                  </span>
                  <p className="font-italiana text-4xl text-off-black">{property.price}</p>
                </div>
                <Link
                  href="/contact"
                  className="block text-center px-8 py-4 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors duration-200"
                >
                  Inquire About This Property
                </Link>
                <Link
                  href="/contact"
                  className="block text-center px-8 py-4 border border-off-black text-off-black font-raleway font-bold text-sm hover:bg-off-black hover:text-white transition-colors duration-200"
                >
                  Schedule a Viewing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
