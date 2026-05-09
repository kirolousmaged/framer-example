import { getSiteContent } from '@/lib/data'
import ContentEditor from './_components/ContentEditor'

export const dynamic = 'force-dynamic'

export default async function ContentPage() {
  const content = await getSiteContent()
  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <h1 className="font-italiana text-4xl text-off-black">Site Content</h1>
        <p className="font-raleway text-sm text-off-black/50 mt-1">
          Edit the text and images displayed across the public website.
        </p>
      </div>
      <ContentEditor initialContent={content} />
    </div>
  )
}
