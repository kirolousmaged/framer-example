import { NextRequest, NextResponse } from 'next/server'
import { getSubmissions, createSubmission } from '@/lib/data'
import { randomUUID } from 'crypto'

export async function GET() {
  const submissions = await getSubmissions()
  return NextResponse.json(submissions)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const submission = await createSubmission({
      id: randomUUID(),
      name: body.name,
      email: body.email,
      phone: body.phone ?? '',
      propertyTitle: body.propertyTitle,
      address: body.address ?? '',
      propertyType: body.propertyType ?? 'House',
      beds: Number(body.beds) || 0,
      baths: Number(body.baths) || 0,
      sqft: body.sqft ?? '',
      askingPrice: body.askingPrice ?? '',
      description: body.description ?? '',
      images: Array.isArray(body.images) ? body.images : [],
    })
    return NextResponse.json(submission, { status: 201 })
  } catch (err) {
    console.error('[POST /api/submissions]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
