import { getSiteContent } from '@/lib/data'
import PageHero from '@/components/ui/PageHero'
import Stats from '@/components/ui/Stats'
import Testimonials from '@/components/ui/Testimonials'
import CTA from '@/components/ui/CTA'
import AboutBio from './_components/AboutBio'
import ServicesSection from './_components/ServicesSection'

export default async function AboutPage() {
  const content = await getSiteContent()
  return (
    <>
      <PageHero
        preTitle="Get to Know"
        title="About Olivia"
        image="https://framerusercontent.com/images/T5pE9MEqzmIpPCbew88PF6J2YxI.jpg"
      />
      <AboutBio
        bio1={content.about_bio_1 || ''}
        bio2={content.about_bio_2 || ''}
        photo={content.about_photo || 'https://framerusercontent.com/images/1DvKVpy6gPlZtL3SpcE6uWTvxA.jpg'}
      />
      <Stats />
      <ServicesSection />
      <Testimonials />
      <CTA />
    </>
  )
}
