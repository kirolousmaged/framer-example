import { getSubmissions } from '@/lib/data'
import SubmissionsTable from './_components/SubmissionsTable'

export const dynamic = 'force-dynamic'

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions()

  const pending   = submissions.filter((s) => s.status === 'pending').length
  const contacted = submissions.filter((s) => s.status === 'contacted').length
  const accepted  = submissions.filter((s) => s.status === 'accepted').length
  const rejected  = submissions.filter((s) => s.status === 'rejected').length

  const stats = [
    { label: 'Pending',   value: pending,   color: 'bg-amber-500' },
    { label: 'Contacted', value: contacted, color: 'bg-blue-500' },
    { label: 'Accepted',  value: accepted,  color: 'bg-emerald-500' },
    { label: 'Rejected',  value: rejected,  color: 'bg-red-500' },
  ]

  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <h1 className="font-italiana text-4xl text-off-black">Property Submissions</h1>
        <p className="font-raleway text-sm text-off-black/50 mt-1">
          Seller listing requests from the public website.
        </p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 p-5 flex items-center gap-4">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.color}`} />
            <div>
              <p className="font-italiana text-3xl text-off-black">{s.value}</p>
              <p className="font-montserrat text-xs text-off-black/50 uppercase tracking-wider">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <SubmissionsTable submissions={submissions} />
    </div>
  )
}
