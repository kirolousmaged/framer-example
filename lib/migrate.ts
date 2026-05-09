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
