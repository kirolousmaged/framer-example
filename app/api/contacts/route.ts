import { NextRequest, NextResponse } from 'next/server'
import { getContacts, saveContacts } from '@/lib/data'
import type { Contact } from '@/lib/data'

export async function GET() {
  const contacts = await getContacts()
  return NextResponse.json(contacts)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const contacts = await getContacts()

  const newContact: Contact = {
    id: crypto.randomUUID(),
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone ?? '',
    message: body.message,
    createdAt: new Date().toISOString(),
    read: false,
  }

  contacts.push(newContact)
  await saveContacts(contacts)

  return NextResponse.json(newContact, { status: 201 })
}
