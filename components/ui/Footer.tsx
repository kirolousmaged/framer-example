import Link from 'next/link'
import { getSiteContent } from '@/lib/data'

const pageLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: "Let's Connect", href: '/contact' },
]

const utilityLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

const socialIcons = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  youtube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
  email: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
}

export default async function Footer() {
  const content = await getSiteContent()

  const phone = content.contact_phone || '+1 (234) 567-8900'
  const email = content.contact_email || 'olivia@example.com'
  const address = content.contact_address || '1234 Main Street, Suite 500\nLos Angeles, CA 90015'

  const socials = [
    { label: 'Instagram', href: content.social_instagram || '#', icon: socialIcons.instagram },
    { label: 'Facebook',  href: content.social_facebook  || '#', icon: socialIcons.facebook },
    { label: 'YouTube',   href: content.social_youtube   || '#', icon: socialIcons.youtube },
    { label: 'Email',     href: `mailto:${email}`,               icon: socialIcons.email },
  ]

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto w-[90%] max-w-screen-xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12">
          <div className="flex flex-col gap-8">
            <Link href="/" className="font-italiana text-3xl text-off-black hover:opacity-70 transition-opacity">
              Olivia Sinclair
            </Link>
            <div className="flex flex-col gap-3 max-w-xs">
              <h4 className="font-montserrat font-semibold text-lg text-off-black">
                Stay Updated on the Market
              </h4>
              <p className="font-montserrat text-sm text-off-black/70 leading-relaxed">
                Get exclusive real estate insights, market trends, and property updates straight to your inbox.
              </p>
              <form className="flex gap-2 mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 border border-gray-200 font-raleway text-sm text-off-black placeholder:text-off-black/40 focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[{ heading: 'Pages', links: pageLinks }, { heading: 'Utility', links: utilityLinks }].map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-4">
                <h5 className="font-montserrat font-semibold text-sm text-off-black uppercase tracking-wider">{heading}</h5>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="font-montserrat text-sm text-off-black/70 hover:text-accent transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mb-8">
          <h5 className="font-montserrat font-semibold text-xs text-off-black uppercase tracking-wider mb-4">
            Contact Information
          </h5>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8">
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 font-montserrat text-sm text-off-black/70 hover:text-accent transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              {phone}
            </a>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 font-montserrat text-sm text-off-black/70 hover:text-accent transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {email}
            </a>
            <span className="inline-flex items-center gap-2 font-montserrat text-sm text-off-black/70">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {address.replace('\n', ' ')}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-gray-100 pt-8">
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="font-montserrat text-xs text-off-black/50">
            &copy; {new Date().getFullYear()} Ambience. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
