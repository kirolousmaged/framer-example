import { sql } from './db'

export interface Property {
  id: string
  slug: string
  title: string
  beds: number
  baths: number
  sqft: string
  price: string
  image: string
  gallery: string[]
  status: 'For Sale' | 'Sold'
  description: string
  createdAt: string
}

export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  createdAt: string
  read: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProperty(row: any): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    beds: Number(row.beds),
    baths: Number(row.baths),
    sqft: row.sqft,
    price: row.price,
    image: row.image,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    status: row.status as 'For Sale' | 'Sold',
    description: row.description ?? '',
    createdAt: row.created_at,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapContact(row: any): Contact {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone ?? '',
    message: row.message,
    createdAt: row.created_at,
    read: row.read,
  }
}

// ─── Properties ──────────────────────────────────────────────────────────────

export async function getProperties(): Promise<Property[]> {
  try {
    const rows = await sql`SELECT * FROM properties ORDER BY created_at DESC`
    return rows.map(mapProperty)
  } catch {
    return []
  }
}

export async function getProperty(slug: string): Promise<Property | null> {
  const rows = await sql`SELECT * FROM properties WHERE slug = ${slug} LIMIT 1`
  return rows.length ? mapProperty(rows[0]) : null
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const rows = await sql`SELECT * FROM properties WHERE id = ${id} LIMIT 1`
  return rows.length ? mapProperty(rows[0]) : null
}

export async function createProperty(
  data: Omit<Property, 'createdAt'>
): Promise<Property> {
  const gallery = JSON.stringify(data.gallery ?? [])
  const rows = await sql`
    INSERT INTO properties (id, slug, title, beds, baths, sqft, price, image, gallery, status, description, created_at)
    VALUES (${data.id}, ${data.slug}, ${data.title}, ${data.beds}, ${data.baths}, ${data.sqft}, ${data.price}, ${data.image}, ${gallery}::jsonb, ${data.status}, ${data.description}, NOW())
    RETURNING *
  `
  return mapProperty(rows[0])
}

export async function updateProperty(
  id: string,
  updates: Partial<Omit<Property, 'id' | 'createdAt'>>
): Promise<Property | null> {
  const existing = await getPropertyById(id)
  if (!existing) return null
  const m = { ...existing, ...updates }
  const gallery = JSON.stringify(m.gallery ?? [])
  const rows = await sql`
    UPDATE properties SET
      slug        = ${m.slug},
      title       = ${m.title},
      beds        = ${m.beds},
      baths       = ${m.baths},
      sqft        = ${m.sqft},
      price       = ${m.price},
      image       = ${m.image},
      gallery     = ${gallery}::jsonb,
      status      = ${m.status},
      description = ${m.description}
    WHERE id = ${id}
    RETURNING *
  `
  return rows.length ? mapProperty(rows[0]) : null
}

export async function deleteProperty(id: string): Promise<void> {
  await sql`DELETE FROM properties WHERE id = ${id}`
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export async function getContacts(): Promise<Contact[]> {
  try {
    const rows = await sql`SELECT * FROM contacts ORDER BY created_at DESC`
    return rows.map(mapContact)
  } catch {
    return []
  }
}

export async function createContact(
  data: Omit<Contact, 'createdAt' | 'read'>
): Promise<Contact> {
  const rows = await sql`
    INSERT INTO contacts (id, first_name, last_name, email, phone, message, created_at, read)
    VALUES (${data.id}, ${data.firstName}, ${data.lastName}, ${data.email}, ${data.phone ?? ''}, ${data.message}, NOW(), false)
    RETURNING *
  `
  return mapContact(rows[0])
}

export async function markContactRead(id: string): Promise<void> {
  await sql`UPDATE contacts SET read = true WHERE id = ${id}`
}

export async function deleteContact(id: string): Promise<void> {
  await sql`DELETE FROM contacts WHERE id = ${id}`
}

// ─── Posts (Blog) ─────────────────────────────────────────────────────────────

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  published: boolean
  createdAt: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(row: any): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? '',
    content: row.content ?? '',
    image: row.image ?? '',
    published: row.published ?? false,
    createdAt: row.created_at,
  }
}

export async function getPosts(publishedOnly = false): Promise<Post[]> {
  try {
    const rows = publishedOnly
      ? await sql`SELECT * FROM posts WHERE published = true ORDER BY created_at DESC`
      : await sql`SELECT * FROM posts ORDER BY created_at DESC`
    return rows.map(mapPost)
  } catch {
    return []
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const rows = await sql`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`
  return rows.length ? mapPost(rows[0]) : null
}

export async function getPostById(id: string): Promise<Post | null> {
  const rows = await sql`SELECT * FROM posts WHERE id = ${id} LIMIT 1`
  return rows.length ? mapPost(rows[0]) : null
}

export async function createPost(data: Omit<Post, 'createdAt'>): Promise<Post> {
  const rows = await sql`
    INSERT INTO posts (id, slug, title, excerpt, content, image, published, created_at)
    VALUES (${data.id}, ${data.slug}, ${data.title}, ${data.excerpt}, ${data.content}, ${data.image}, ${data.published}, NOW())
    RETURNING *
  `
  return mapPost(rows[0])
}

export async function updatePost(
  id: string,
  updates: Partial<Omit<Post, 'id' | 'createdAt'>>
): Promise<Post | null> {
  const existing = await getPostById(id)
  if (!existing) return null
  const m = { ...existing, ...updates }
  const rows = await sql`
    UPDATE posts SET
      slug      = ${m.slug},
      title     = ${m.title},
      excerpt   = ${m.excerpt},
      content   = ${m.content},
      image     = ${m.image},
      published = ${m.published}
    WHERE id = ${id}
    RETURNING *
  `
  return rows.length ? mapPost(rows[0]) : null
}

export async function deletePost(id: string): Promise<void> {
  await sql`DELETE FROM posts WHERE id = ${id}`
}

// ─── Site content (CMS) ───────────────────────────────────────────────────────

export async function getSiteContent(): Promise<Record<string, string>> {
  try {
    const rows = await sql`SELECT key, value FROM site_content`
    return Object.fromEntries(rows.map((r) => [r.key, r.value]))
  } catch {
    return {}
  }
}

export async function setSiteContentKeys(
  updates: Record<string, string>
): Promise<void> {
  for (const [key, value] of Object.entries(updates)) {
    await sql`
      INSERT INTO site_content (key, value, label, section)
      VALUES (${key}, ${value}, ${key}, 'custom')
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `
  }
}
