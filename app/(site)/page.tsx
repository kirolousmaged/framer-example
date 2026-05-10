import { getSiteContent, getProperties, getPosts, getFaqs } from '@/lib/data'
import type { Faq } from '@/lib/data'

export const dynamic = 'force-dynamic'
import Hero from '@/components/ui/Hero'
import SolutionsMenu from '@/components/ui/SolutionsMenu'
import About from '@/components/ui/About'
import Stats from '@/components/ui/Stats'
import FeaturedListings from '@/components/ui/FeaturedListings'
import Testimonials from '@/components/ui/Testimonials'
import BlogSection from '@/components/ui/BlogSection'
import FAQ from '@/components/ui/FAQ'
import CTA from '@/components/ui/CTA'

const FALLBACK_FAQS: Faq[] = [
  { id: 'faq-1', position: 0, question: 'How do I schedule a property tour?', answer: 'You can schedule a tour by filling out the contact form on our website or calling us directly. One of our agents will get in touch to confirm the date and time that works best for you.' },
  { id: 'faq-2', position: 1, question: 'How long does the home-buying process take?', answer: 'The timeline varies, but on average, it takes between 30 to 60 days from the time you make an offer to the closing date. Factors such as loan approval, home inspections, and negotiations can affect the timeline.' },
  { id: 'faq-3', position: 2, question: 'Do you handle rentals as well?', answer: "Yes, we assist with both property rentals and purchases. Whether you're looking for a short-term lease, a long-term rental, or a rent-to-own option, our agents can help you find the perfect home." },
  { id: 'faq-4', position: 3, question: 'How do I know if a property is a good investment?', answer: "A good investment property typically has strong potential for appreciation, is located in a desirable area, and generates a steady rental income. It's important to consider factors like market trends, property condition, and long-term growth potential before making a decision." },
]

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
      <FAQ faqs={faqs.length > 0 ? faqs : FALLBACK_FAQS} />
      <CTA />
    </>
  )
}
