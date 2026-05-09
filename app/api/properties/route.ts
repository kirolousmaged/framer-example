import { NextRequest, NextResponse } from 'next/server'
import { getProperties, saveProperties } from '@/lib/data'
import type { Property } from '@/lib/data'

export async function GET() {
  const properties = await getProperties()
  return NextResponse.json(properties)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const properties = await getProperties()

  const slug =
    body.slug ||
    (body.title as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

  const newProperty: Property = {
    id: crypto.randomUUID(),
    slug,
    title: body.title,
    beds: Number(body.beds),
    baths: Number(body.baths),
    sqft: body.sqft,
    price: body.price,
    image: body.image,
    gallery: Array.isArray(body.gallery) ? body.gallery : [],
    status: body.status ?? 'For Sale',
    description: body.description ?? '',
    createdAt: new Date().toISOString(),
  }

  properties.push(newProperty)
  await saveProperties(properties)

  return NextResponse.json(newProperty, { status: 201 })
}
