import { getSiteContent } from '@/lib/data'
import PageHero from '@/components/ui/PageHero'
import ContactMain from './_components/ContactMain'

export default async function ContactPage() {
  const content = await getSiteContent()
  return (
    <>
      <PageHero
        preTitle="Reach Out"
        title="Let's Connect"
        image="https://framerusercontent.com/images/XHjb2nvN3Jd2DDPrmmf2kYt3IM.jpg"
      />
      <ContactMain
        phone={content.contact_phone || '+1 (234) 567-8900'}
        email={content.contact_email || 'olivia@example.com'}
        address={content.contact_address || '1234 Main Street, Suite 500\nLos Angeles, CA 90015'}
        hours={content.contact_hours || 'Monday – Friday\n9:00 AM – 6:00 PM'}
      />
    </>
  )
}
