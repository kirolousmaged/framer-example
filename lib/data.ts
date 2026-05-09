import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

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

export async function getProperties(): Promise<Property[]> {
  const raw = await readFile(path.join(DATA_DIR, 'properties.json'), 'utf-8')
  return JSON.parse(raw)
}

export async function getProperty(slug: string): Promise<Property | null> {
  const properties = await getProperties()
  return properties.find((p) => p.slug === slug) ?? null
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const properties = await getProperties()
  return properties.find((p) => p.id === id) ?? null
}

export async function saveProperties(properties: Property[]): Promise<void> {
  await writeFile(
    path.join(DATA_DIR, 'properties.json'),
    JSON.stringify(properties, null, 2),
    'utf-8'
  )
}

export async function getContacts(): Promise<Contact[]> {
  const raw = await readFile(path.join(DATA_DIR, 'contacts.json'), 'utf-8')
  return JSON.parse(raw)
}

export async function saveContacts(contacts: Contact[]): Promise<void> {
  await writeFile(
    path.join(DATA_DIR, 'contacts.json'),
    JSON.stringify(contacts, null, 2),
    'utf-8'
  )
}
