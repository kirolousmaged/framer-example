import { getSubmissionById } from '@/lib/data'
import { notFound } from 'next/navigation'
import SubmissionDetail from '../_components/SubmissionDetail'

export const dynamic = 'force-dynamic'

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const submission = await getSubmissionById(id)
  if (!submission) notFound()

  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <h1 className="font-italiana text-4xl text-off-black">Submission Details</h1>
        <p className="font-raleway text-sm text-off-black/50 mt-1 truncate">{submission.propertyTitle}</p>
      </div>
      <SubmissionDetail submission={submission} />
    </div>
  )
}
