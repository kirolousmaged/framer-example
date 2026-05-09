import { NextRequest, NextResponse } from 'next/server'
import { getProperties, saveProperties } from '@/lib/data'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const properties = await getProperties()
  const property = properties.find((p) => p.id === id)
  if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(property)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const properties = await getProperties()
  const index = properties.findIndex((p) => p.id === id)
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  properties[index] = { ...properties[index], ...body, id }
  await saveProperties(properties)

  return NextResponse.json(properties[index])
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const properties = await getProperties()
  const filtered = properties.filter((p) => p.id !== id)
  await saveProperties(filtered)
  return NextResponse.json({ success: true })
}
