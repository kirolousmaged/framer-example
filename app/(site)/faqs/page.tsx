import { getFaqs } from '@/lib/data'
import type { Faq } from '@/lib/data'
import PageHero from '@/components/ui/PageHero'
import FAQAccordion from './_components/FAQAccordion'
import CTA from '@/components/ui/CTA'

export const dynamic = 'force-dynamic'

const FALLBACK_FAQS: Faq[] = [
  { id: 'faq-1', position: 0, question: 'How do I schedule a property tour?', answer: 'You can schedule a tour by filling out the contact form on our website or calling us directly. One of our agents will get in touch to confirm the date and time that works best for you.' },
  { id: 'faq-2', position: 1, question: 'How long does the home-buying process take?', answer: 'The timeline varies, but on average, it takes between 30 to 60 days from the time you make an offer to the closing date. Factors such as loan approval, home inspections, and negotiations can affect the timeline.' },
  { id: 'faq-3', position: 2, question: 'Do you handle rentals as well?', answer: "Yes, we assist with both property rentals and purchases. Whether you're looking for a short-term lease, a long-term rental, or a rent-to-own option, our agents can help you find the perfect home." },
  { id: 'faq-4', position: 3, question: 'How do I know if a property is a good investment?', answer: "A good investment property typically has strong potential for appreciation, is located in a desirable area, and generates a steady rental income. It's important to consider factors like market trends, property condition, and long-term growth potential before making a decision." },
]

export default async function FAQsPage() {
  const faqs = await getFaqs()
  const displayed = faqs.length > 0 ? faqs : FALLBACK_FAQS

  return (
    <>
      <PageHero
        preTitle="Got Questions?"
        title="Frequently Asked Questions"
        image="https://framerusercontent.com/images/T5pE9MEqzmIpPCbew88PF6J2YxI.jpg"
      />
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto w-[90%] max-w-screen-lg">
          <FAQAccordion faqs={displayed} />
        </div>
      </section>
      <CTA />
    </>
  )
}
