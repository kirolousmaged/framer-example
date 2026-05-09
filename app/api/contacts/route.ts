import { NextRequest, NextResponse } from 'next/server'
import { getContacts, createContact } from '@/lib/data'

export async function GET() {
  const contacts = await getContacts()
  return NextResponse.json(contacts)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const contact = await createContact({
    id: crypto.randomUUID(),
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone ?? '',
    message: body.message,
  })
  return NextResponse.json(contact, { status: 201 })
}
