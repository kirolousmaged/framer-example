import { getSiteContent } from '@/lib/data'
import PageHero from '@/components/ui/PageHero'

export const dynamic = 'force-dynamic'

const FALLBACK = `At Olivia Sinclair Real Estate, we are committed to protecting your privacy and handling your personal information with care and transparency.

Information We Collect

We collect personal information that you voluntarily provide through our contact forms, property inquiry forms, and property submission forms. This may include your name, email address, phone number, property details, and any messages or files you choose to share with us.

How We Use Your Information

Your information is used solely to respond to your inquiries, facilitate real estate transactions, and improve the quality of our services. We do not use your data for unrelated marketing purposes, and we never sell your information to third parties.

Property Submissions

When you submit a property through our website, your personal contact details will remain confidential and will not be shared with potential buyers. All buyer inquiries and transactions are handled directly by Olivia Sinclair Real Estate.

Information Sharing

Your personal information is not sold, traded, or transferred to outside parties. It may be shared internally with our licensed agents and staff solely for the purpose of serving your real estate needs.

Data Security

We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction.

Cookies

Our website may use cookies to enhance your browsing experience. You can disable cookies at any time through your browser settings.

Your Rights

You have the right to access, correct, or request deletion of your personal information at any time. To exercise these rights, please contact us directly.

Changes to This Policy

We may update this Privacy Policy periodically. Any updates will be posted on this page with a revised effective date.

Contact Us

If you have any questions about this Privacy Policy, please reach out to us through our contact page or by calling our office directly.`

export default async function PrivacyPolicyPage() {
  const content = await getSiteContent()
  const text = content.privacy_policy || FALLBACK

  return (
    <>
      <PageHero
        preTitle="Legal"
        title="Privacy Policy"
        image="https://framerusercontent.com/images/1DvKVpy6gPlZtL3SpcE6uWTvxA.jpg"
      />
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto w-[90%] max-w-screen-md">
          <p className="font-montserrat text-xs text-off-black/40 uppercase tracking-widest mb-10">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <div className="flex flex-col gap-6">
            {text.split('\n\n').filter(Boolean).map((para, i) => {
              const isHeading = para.trim().split('\n').length === 1 && para.length < 60 && !para.endsWith('.')
              return isHeading ? (
                <h2 key={i} className="font-raleway font-semibold text-xl text-off-black mt-4 first:mt-0">
                  {para.trim()}
                </h2>
              ) : (
                <p key={i} className="font-raleway text-base text-off-black/70 leading-relaxed">
                  {para.trim()}
                </p>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
