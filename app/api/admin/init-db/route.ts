import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

const SEED_PROPERTIES = [
  { id: '2', slug: 'beverly-hills', title: 'Luxury Estate, Beverly Hills', beds: 5, baths: 4, sqft: '5,200 SQ.FT', price: '$12,500,000', image: 'https://framerusercontent.com/images/1DvKVpy6gPlZtL3SpcE6uWTvxA.jpg', status: 'Sold', description: 'An iconic Beverly Hills estate set behind private gates on a prime corner lot. The light-filled interior showcases designer finishes throughout, with a grand foyer, formal dining room, state-of-the-art home theater, and lushly landscaped grounds.' },
  { id: '3', slug: 'malibu-cove', title: 'Modern Villa, Malibu Cove', beds: 4, baths: 3, sqft: '3,100 SQ.FT', price: '$6,200,000', image: 'https://framerusercontent.com/images/4207UCMpGfd1yz62fn7VkACtag.jpg', status: 'For Sale', description: 'Perched above the Pacific, this architectural gem delivers unobstructed ocean views and effortless California living. Walls of glass, a floating staircase, and a wraparound deck make this one of Malibu\'s most coveted addresses.' },
  { id: '4', slug: 'downtown-penthouse', title: 'Penthouse Suite, Downtown LA', beds: 3, baths: 2.5, sqft: '2,800 SQ.FT', price: '$4,950,000', image: 'https://framerusercontent.com/images/T5pE9MEqzmIpPCbew88PF6J2YxI.jpg', status: 'For Sale', description: 'Sky-high living at its finest in the heart of Downtown Los Angeles. This full-floor penthouse features a private rooftop terrace, custom Italian kitchen, and sweeping city-to-ocean views through floor-to-ceiling glass.' },
  { id: '5', slug: 'santa-monica', title: 'Beachfront Retreat, Santa Monica', beds: 4, baths: 3, sqft: '2,950 SQ.FT', price: '$7,800,000', image: 'https://framerusercontent.com/images/XHjb2nvN3Jd2DDPrmmf2kYt3IM.jpg', status: 'Sold', description: 'Steps from the sand on Santa Monica\'s most prestigious block. This thoughtfully renovated beach house offers a relaxed luxury aesthetic, open-plan living, and a private deck with direct beach access.' },
  { id: '6', slug: 'pasadena', title: 'Spanish Colonial, Pasadena', beds: 5, baths: 4.5, sqft: '4,400 SQ.FT', price: '$3,200,000', image: 'https://framerusercontent.com/images/1DvKVpy6gPlZtL3SpcE6uWTvxA.jpg', status: 'For Sale', description: 'A lovingly restored Spanish Colonial revival in one of Pasadena\'s most sought-after neighborhoods. Original arched doorways, hand-painted tiles, and beamed ceilings harmonize beautifully with updated amenities.' },
  { id: '7', slug: 'calabasas', title: 'Contemporary Home, Calabasas', beds: 6, baths: 5, sqft: '5,800 SQ.FT', price: '$9,100,000', image: 'https://framerusercontent.com/images/4207UCMpGfd1yz62fn7VkACtag.jpg', status: 'For Sale', description: 'Set within a prestigious guard-gated community, this meticulously crafted contemporary home features an open-concept floor plan, Venetian plaster walls, a resort pool with spa, and a four-car garage.' },
  { id: '8', slug: 'hancock-park', title: 'Craftsman Bungalow, Hancock Park', beds: 3, baths: 2, sqft: '2,100 SQ.FT', price: '$2,400,000', image: 'https://framerusercontent.com/images/T5pE9MEqzmIpPCbew88PF6J2YxI.jpg', status: 'Sold', description: 'A picture-perfect Craftsman bungalow on a tree-lined Hancock Park street. Original built-ins, hardwood floors, and a wrap-around porch have been carefully preserved while the kitchen, baths, and systems have been fully modernized.' },
  { id: '9', slug: 'bel-air', title: 'Hillside Estate, Bel Air', beds: 7, baths: 6, sqft: '7,200 SQ.FT', price: '$18,000,000', image: 'https://framerusercontent.com/images/XHjb2nvN3Jd2DDPrmmf2kYt3IM.jpg', status: 'For Sale', description: 'An unrivalled Bel Air trophy property commanding sweeping views from the Pacific to downtown. Behind private gates, this architectural statement home offers a grand double-height foyer, home cinema, wine cellar, and a vanishing-edge pool.' },
]

const DEFAULT_CONTENT = [
  { key: 'hero_bg_image', value: 'https://framerusercontent.com/images/XHjb2nvN3Jd2DDPrmmf2kYt3IM.jpg', label: 'Hero Background Image', section: 'hero' },
  { key: 'hero_subtitle', value: 'Your Next Move Starts Here', label: 'Hero Subtitle', section: 'hero' },
  { key: 'hero_tagline', value: 'California Real Estate', label: 'Hero Tagline', section: 'hero' },
  { key: 'about_bio_1', value: 'Olivia Sinclair has always been driven by a deep interest in architecture and design, which led her to pursue a career in real estate. After earning a degree in Real Estate & Property Management from UC Berkeley, she immersed herself in California\'s most prestigious markets.', label: 'About Bio Paragraph 1', section: 'about' },
  { key: 'about_bio_2', value: 'Over a decade later, Olivia has closed more than $300 million in transactions across Los Angeles and the surrounding areas. She is known for her meticulous attention to detail, sharp negotiation skills, and genuine dedication to her clients\' goals — whether buying a first home or selling a multi-million dollar estate.', label: 'About Bio Paragraph 2', section: 'about' },
  { key: 'about_photo', value: 'https://framerusercontent.com/images/1DvKVpy6gPlZtL3SpcE6uWTvxA.jpg', label: 'About Profile Photo', section: 'about' },
  { key: 'contact_phone', value: '+1 (234) 567-8900', label: 'Phone Number', section: 'contact' },
  { key: 'contact_email', value: 'olivia@example.com', label: 'Email Address', section: 'contact' },
  { key: 'contact_address', value: '1234 Main Street, Suite 500\nLos Angeles, CA 90015', label: 'Office Address', section: 'contact' },
  { key: 'contact_hours', value: 'Monday – Friday\n9:00 AM – 6:00 PM', label: 'Office Hours', section: 'contact' },
  { key: 'social_instagram', value: '#', label: 'Instagram URL', section: 'social' },
  { key: 'social_facebook', value: '#', label: 'Facebook URL', section: 'social' },
  { key: 'social_youtube', value: '#', label: 'YouTube URL', section: 'social' },
]

export async function POST() {
  try {
    // Create tables
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

    // Seed properties (skip if any exist)
    const existing = await sql`SELECT COUNT(*) as count FROM properties`
    if (Number(existing[0].count) === 0) {
      for (const p of SEED_PROPERTIES) {
        await sql`
          INSERT INTO properties (id, slug, title, beds, baths, sqft, price, image, gallery, status, description)
          VALUES (${p.id}, ${p.slug}, ${p.title}, ${p.beds}, ${p.baths}, ${p.sqft}, ${p.price}, ${p.image}, '[]'::jsonb, ${p.status}, ${p.description})
          ON CONFLICT DO NOTHING
        `
      }
    }

    // Seed site content (upsert — preserves any user edits)
    for (const c of DEFAULT_CONTENT) {
      await sql`
        INSERT INTO site_content (key, value, label, section)
        VALUES (${c.key}, ${c.value}, ${c.label}, ${c.section})
        ON CONFLICT (key) DO NOTHING
      `
    }

    return NextResponse.json({ success: true, message: 'Database initialized successfully.' })
  } catch (err) {
    console.error('init-db error', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
