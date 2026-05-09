import Hero from '@/components/ui/Hero'
import SolutionsMenu from '@/components/ui/SolutionsMenu'
import About from '@/components/ui/About'
import Stats from '@/components/ui/Stats'
import FeaturedListings from '@/components/ui/FeaturedListings'
import Testimonials from '@/components/ui/Testimonials'
import BlogSection from '@/components/ui/BlogSection'
import FAQ from '@/components/ui/FAQ'
import CTA from '@/components/ui/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SolutionsMenu />
      <About />
      <Stats />
      <FeaturedListings />
      <Testimonials />
      <BlogSection />
      <FAQ />
      <CTA />
    </>
  )
}
