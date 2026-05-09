import { NextRequest, NextResponse } from 'next/server'
import { getContacts, saveContacts } from '@/lib/data'

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const contacts = await getContacts()
  await saveContacts(contacts.filter((c) => c.id !== id))
  return NextResponse.json({ success: true })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const contacts = await getContacts()
  const index = contacts.findIndex((c) => c.id === id)
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  contacts[index] = { ...contacts[index], ...body, id }
  await saveContacts(contacts)

  return NextResponse.json(contacts[index])
}
