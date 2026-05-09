import { NextRequest, NextResponse } from 'next/server'
import { markContactRead, deleteContact } from '@/lib/data'

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await deleteContact(id)
  return NextResponse.json({ success: true })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  if (body.read === true) {
    await markContactRead(id)
  }
  return NextResponse.json({ success: true })
}
