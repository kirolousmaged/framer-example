import PageHero from '@/components/ui/PageHero'
import SubmitPropertyForm from './_components/SubmitPropertyForm'
import CTA from '@/components/ui/CTA'

export default function SellPage() {
  return (
    <>
      <PageHero
        preTitle="Work With Us"
        title="List Your Property"
        image="https://framerusercontent.com/images/4207UCMpGfd1yz62fn7VkACtag.jpg"
      />
      <section className="bg-off-white py-24 md:py-28">
        <div className="mx-auto w-[90%] max-w-screen-lg flex flex-col gap-6">
          <div>
            <h2 className="font-italiana text-4xl text-off-black">Submit Your Property</h2>
            <p className="font-raleway text-sm text-off-black/50 mt-2 max-w-xl">
              Fill in the details below and our team will review your submission. We handle every step of the process — from valuation to closing — so you can sell with confidence.
            </p>
          </div>
          <SubmitPropertyForm />
        </div>
      </section>
      <CTA />
    </>
  )
}
