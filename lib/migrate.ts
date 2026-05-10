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
    const postCount = await sql`SELECT COUNT(*) as count FROM posts`
    if (Number(postCount[0].count) === 0) {
      const seedPosts = [
        {
          id: 'post-1',
          slug: 'first-time-homebuyer-guide',
          title: "First-Time Homebuyer? Here's What You Need to Know",
          excerpt: 'Buying your first home is one of the biggest financial decisions you will ever make. Here is a practical guide to help you navigate the process with confidence.',
          content: "Buying your first home is one of the biggest financial decisions you'll ever make — and it can feel overwhelming. From securing financing to closing the deal, there are many steps involved. This guide will walk you through everything you need to know.\n\nThe first step is getting pre-approved for a mortgage. This gives you a clear picture of your budget and signals to sellers that you're a serious buyer. Shop around for lenders and compare interest rates, fees, and loan terms before committing.\n\nNext, make a list of your must-haves and nice-to-haves in a home. Think about location, size, school districts, and commute times. Knowing your priorities will save you time and help your agent find the right properties faster.\n\nWhen you find a home you love, your agent will help you make a competitive offer. Don't be discouraged if your first offer isn't accepted — negotiation is a normal part of the process.\n\nOnce your offer is accepted, you'll enter the due diligence period. This is when you'll schedule a home inspection, review the title report, and finalize your mortgage. Stay in close contact with your lender and agent throughout this stage.\n\nFinally, you'll attend closing, sign the paperwork, and receive your keys. Congratulations — you're a homeowner!",
          image: 'https://framerusercontent.com/images/XHjb2nvN3Jd2DDPrmmf2kYt3IM.jpg',
          published: true,
        },
        {
          id: 'post-2',
          slug: 'top-neighborhoods-la-luxury-living',
          title: 'Top 5 Neighborhoods in Los Angeles for Luxury Living',
          excerpt: 'From the hills of Bel Air to the shores of Malibu, Los Angeles offers some of the most coveted addresses in the world. Here are the top five neighborhoods for luxury real estate.',
          content: "Los Angeles is home to some of the most iconic luxury neighborhoods in the world. Whether you're drawn to ocean views, hillside estates, or urban sophistication, there's a corner of LA that fits your lifestyle.\n\n**Bel Air** sits in the hills above Westwood and is synonymous with privacy and prestige. Gated estates, lush greenery, and sweeping city-to-ocean views make it one of LA's most sought-after zip codes.\n\n**Beverly Hills** needs no introduction. The combination of world-class dining, designer shopping on Rodeo Drive, and stunning homes on tree-lined streets makes this a perennial favorite for luxury buyers.\n\n**Malibu** offers 27 miles of Pacific coastline and some of the most dramatic real estate in California. From beachfront bungalows to clifftop compounds, Malibu attracts those who want to live close to nature without sacrificing luxury.\n\n**Pacific Palisades** blends the relaxed pace of a seaside village with the amenities of a major city. It's popular with families who want top-rated schools, hiking trails, and easy access to the beach.\n\n**West Hollywood** is the epicenter of LA's creative scene. Sleek architectural homes, rooftop pools, and proximity to the Sunset Strip make it a top choice for those who want to be in the heart of the action.",
          image: 'https://framerusercontent.com/images/1DvKVpy6gPlZtL3SpcE6uWTvxA.jpg',
          published: true,
        },
        {
          id: 'post-3',
          slug: 'how-to-stage-your-home-for-a-quick-sale',
          title: 'How to Stage Your Home for a Quick Sale',
          excerpt: 'A well-staged home sells faster and for more money. These proven tips will help you present your property in its best light and attract serious buyers from day one.',
          content: "First impressions matter — especially in real estate. A well-staged home not only photographs better but also helps buyers imagine themselves living there. Here are the most effective staging strategies to sell your home quickly and at the best possible price.\n\n**Declutter and depersonalize.** Remove personal photos, excess furniture, and anything that makes the space feel crowded. Buyers need to envision the home as their own, and that's hard to do when it's full of someone else's belongings.\n\n**Deep clean everything.** This sounds obvious, but it's often overlooked. Clean grout, spotless windows, and fresh-smelling rooms signal to buyers that the home has been well maintained.\n\n**Maximize natural light.** Open all blinds and curtains before showings. Replace any burned-out bulbs and consider adding floor lamps to dark corners. Light and airy spaces feel larger and more inviting.\n\n**Focus on curb appeal.** The exterior is the first thing buyers see. Mow the lawn, trim hedges, plant fresh flowers, and give the front door a fresh coat of paint if needed.\n\n**Neutralize bold colors.** If you have rooms painted in strong or unusual colors, consider repainting them in neutral tones like white, greige, or soft grey. Neutral palettes appeal to the widest range of buyers.\n\nThese investments are small compared to the return they generate. Staged homes consistently sell faster and closer to the asking price than unstaged ones.",
          image: 'https://framerusercontent.com/images/4207UCMpGfd1yz62fn7VkACtag.jpg',
          published: true,
        },
      ]
      for (const p of seedPosts) {
        await sql`
          INSERT INTO posts (id, slug, title, excerpt, content, image, published)
          VALUES (${p.id}, ${p.slug}, ${p.title}, ${p.excerpt}, ${p.content}, ${p.image}, ${p.published})
          ON CONFLICT DO NOTHING
        `
      }
    }

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
