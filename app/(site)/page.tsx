import { getSiteContent, getProperties, getPosts, getFaqs } from '@/lib/data'
import Hero from '@/components/ui/Hero'
import SolutionsMenu from '@/components/ui/SolutionsMenu'
import About from '@/components/ui/About'
import Stats from '@/components/ui/Stats'
import FeaturedListings from '@/components/ui/FeaturedListings'
import Testimonials from '@/components/ui/Testimonials'
import BlogSection from '@/components/ui/BlogSection'
import FAQ from '@/components/ui/FAQ'
import CTA from '@/components/ui/CTA'

export default async function HomePage() {
  const [content, properties, posts, faqs] = await Promise.all([
    getSiteContent(),
    getProperties(),
    getPosts(true),
    getFaqs(),
  ])

  return (
    <>
      <Hero
        subtitle={content.hero_subtitle}
        tagline={content.hero_tagline}
        bgImage={content.hero_bg_image}
      />
      <SolutionsMenu />
      <About />
      <Stats />
      <FeaturedListings properties={properties} />
      <Testimonials />
      <BlogSection posts={posts} />
      <FAQ faqs={faqs} />
      <CTA />
    </>
  )
}
