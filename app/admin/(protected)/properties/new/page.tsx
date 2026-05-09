import Link from 'next/link'
import PropertyForm from '../_components/PropertyForm'

export default function NewPropertyPage() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/properties"
          className="text-off-black/40 hover:text-off-black transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="font-italiana text-4xl text-off-black">Add Property</h1>
      </div>

      <PropertyForm />
    </div>
  )
}
