import { getSiteContent } from '@/lib/data'
import PrivacyPolicyEditor from './_components/PrivacyPolicyEditor'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const FALLBACK = `At Olivia Sinclair Real Estate, we are committed to protecting your privacy and handling your personal information with care and transparency.

Information We Collect

We collect personal information that you voluntarily provide through our contact forms, property inquiry forms, and property submission forms.

How We Use Your Information

Your information is used solely to respond to your inquiries, facilitate real estate transactions, and improve the quality of our services.

Your Rights

You have the right to access, correct, or request deletion of your personal information at any time.

Contact Us

If you have any questions about this Privacy Policy, please reach out to us through our contact page.`

export default async function AdminPrivacyPolicyPage() {
  const content = await getSiteContent()
  const initialContent = content.privacy_policy || FALLBACK

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-italiana text-4xl text-off-black">Privacy Policy</h1>
          <p className="font-raleway text-sm text-off-black/50 mt-1">
            Edit the privacy policy shown at <span className="text-accent">/privacy-policy</span>.
          </p>
        </div>
        <Link
          href="/privacy-policy"
          target="_blank"
          className="flex items-center gap-2 font-raleway text-sm text-off-black/50 hover:text-off-black transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Live
        </Link>
      </div>
      <PrivacyPolicyEditor initialContent={initialContent} />
    </div>
  )
}
