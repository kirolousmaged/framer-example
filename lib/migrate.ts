import { sql } from './db'

let ran = false

const DEFAULT_CONTENT = [
  ['hero_bg_image', 'https://framerusercontent.com/images/XHjb2nvN3Jd2DDPrmmf2kYt3IM.jpg', 'Hero Background Image', 'hero'],
  ['hero_subtitle', 'Your Next Move Starts Here', 'Hero Subtitle', 'hero'],
  ['hero_tagline', 'California Real Estate', 'Hero Tagline', 'hero'],
  ['about_bio_1', "Olivia Sinclair has always been driven by a deep interest in architecture and design, which led her to pursue a career in real estate. After earning a degree in Real Estate & Property Management from UC Berkeley, she immersed herself in California's most prestigious markets.", 'About Bio Paragraph 1', 'about'],
  ['about_bio_2', "Over a decade later, Olivia has closed more than $300 million in transactions across Los Angeles and the surrounding areas. She is known for her meticulous attention to detail, sharp negotiation skills, and genuine dedication to her clients' goals.", 'About Bio Paragraph 2', 'about'],
  ['about_photo', 'https://framerusercontent.com/images/1DvKVpy6gPlZtL3SpcE6uWTvxA.jpg', 'About Profile Photo', 'about'],
  ['contact_phone', '+1 (234) 567-8900', 'Phone Number', 'contact'],
  ['contact_email', 'olivia@example.com', 'Email Address', 'contact'],
  ['contact_address', '1234 Main Street, Suite 500\nLos Angeles, CA 90015', 'Office Address', 'contact'],
  ['contact_hours', 'Monday – Friday\n9:00 AM – 6:00 PM', 'Office Hours', 'contact'],
  ['social_instagram', '#', 'Instagram URL', 'social'],
  ['social_facebook', '#', 'Facebook URL', 'social'],
  ['social_youtube', '#', 'YouTube URL', 'social'],
] as const

export async function ensureMigrated() {
  if (ran) return
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS properties (
        id          TEXT PRIMARY KEY,
        slug        TEXT UNIQUE NOT NULL,
        title       TEXT NOT NULL,
        beds        INTEGER NOT NULL,
        baths       NUMERIC(4,1) NOT NULL,
        sqft        TEXT NOT NULL,
        price       TEXT NOT NULL,
        image       TEXT NOT NULL,
        gallery     JSONB DEFAULT '[]'::JSONB,
        status      TEXT NOT NULL DEFAULT 'For Sale',
        description TEXT DEFAULT '',
        created_at  TIMESTAMPTZ DEFAULT NOW()
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id         TEXT PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name  TEXT NOT NULL,
        email      TEXT NOT NULL,
        phone      TEXT DEFAULT '',
        message    TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        read       BOOLEAN DEFAULT FALSE
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS site_content (
        key     TEXT PRIMARY KEY,
        value   TEXT NOT NULL,
        label   TEXT NOT NULL DEFAULT '',
        section TEXT NOT NULL DEFAULT 'general'
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id          TEXT PRIMARY KEY,
        slug        TEXT UNIQUE NOT NULL,
        title       TEXT NOT NULL,
        excerpt     TEXT DEFAULT '',
        content     TEXT DEFAULT '',
        image       TEXT DEFAULT '',
        published   BOOLEAN DEFAULT FALSE,
        created_at  TIMESTAMPTZ DEFAULT NOW()
      )
    `
    await sql`
      CREATE TABLE IF NOT EXISTS faqs (
        id       TEXT PRIMARY KEY,
        question TEXT NOT NULL,
        answer   TEXT NOT NULL,
        position INTEGER NOT NULL DEFAULT 0
      )
    `
    const faqCount = await sql`SELECT COUNT(*) as count FROM faqs`
    if (Number(faqCount[0].count) === 0) {
      const seeds = [
        { id: 'faq-1', question: 'How do I schedule a property tour?', answer: 'You can schedule a tour by filling out the contact form on our website or calling us directly. One of our agents will get in touch to confirm the date and time that works best for you.', position: 0 },
        { id: 'faq-2', question: 'How long does the home-buying process take?', answer: 'The timeline varies, but on average, it takes between 30 to 60 days from the time you make an offer to the closing date. Factors such as loan approval, home inspections, and negotiations can affect the timeline.', position: 1 },
        { id: 'faq-3', question: 'Do you handle rentals as well?', answer: "Yes, we assist with both property rentals and purchases. Whether you're looking for a short-term lease, a long-term rental, or a rent-to-own option, our agents can help you find the perfect home.", position: 2 },
        { id: 'faq-4', question: 'How do I know if a property is a good investment?', answer: "A good investment property typically has strong potential for appreciation, is located in a desirable area, and generates a steady rental income. It's important to consider factors like market trends, property condition, and long-term growth potential before making a decision.", position: 3 },
      ]
      for (const f of seeds) {
        await sql`INSERT INTO faqs (id, question, answer, position) VALUES (${f.id}, ${f.question}, ${f.answer}, ${f.position}) ON CONFLICT DO NOTHING`
      }
    }
    for (const [key, value, label, section] of DEFAULT_CONTENT) {
      await sql`
        INSERT INTO site_content (key, value, label, section)
        VALUES (${key}, ${value}, ${label}, ${section})
        ON CONFLICT (key) DO NOTHING
      `
    }
    ran = true
  } catch (err) {
    console.error('[migrate] error:', err)
  }
}
