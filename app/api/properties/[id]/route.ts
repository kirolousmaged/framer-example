import { NextRequest, NextResponse } from 'next/server'
import { getPropertyById, updateProperty, deleteProperty } from '@/lib/data'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const property = await getPropertyById(id)
  if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(property)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const property = await updateProperty(id, {
    slug: body.slug,
    title: body.title,
    beds: Number(body.beds),
    baths: Number(body.baths),
    sqft: body.sqft,
    price: body.price,
    image: body.image,
    gallery: Array.isArray(body.gallery) ? body.gallery : [],
    status: body.status,
    description: body.description ?? '',
  })
  if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(property)
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await deleteProperty(id)
  return NextResponse.json({ success: true })
}
