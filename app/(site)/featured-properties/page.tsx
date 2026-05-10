import PageHero from '@/components/ui/PageHero'
import CTA from '@/components/ui/CTA'
import { getProperties } from '@/lib/data'
import PropertyListings from './_components/PropertyListings'

export const dynamic = 'force-dynamic'

export default async function FeaturedPropertiesPage() {
  const properties = await getProperties()

  return (
    <>
      <PageHero
        preTitle="Olivia Sinclair"
        title="Featured Properties"
        image="https://framerusercontent.com/images/T5pE9MEqzmIpPCbew88PF6J2YxI.jpg"
      />
      <PropertyListings properties={properties} />
      <CTA />
    </>
  )
}
