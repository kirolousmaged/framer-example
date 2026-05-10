import { getFaqs } from '@/lib/data'
import FAQEditor from './_components/FAQEditor'

export const dynamic = 'force-dynamic'

export default async function AdminFaqsPage() {
  const faqs = await getFaqs()

  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <h1 className="font-italiana text-4xl text-off-black">FAQs</h1>
        <p className="font-raleway text-sm text-off-black/50 mt-1">
          Manage the frequently asked questions shown on the homepage.
        </p>
      </div>
      <FAQEditor initialFaqs={faqs} />
    </div>
  )
}
