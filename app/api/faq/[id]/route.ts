import { NextRequest, NextResponse } from 'next/server'
import { updateFaq, deleteFaq } from '@/lib/data'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const faq = await updateFaq(id, {
      question: body.question,
      answer: body.answer,
      position: body.position,
    })
    if (!faq) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(faq)
  } catch (err) {
    console.error('[PUT /api/faq/[id]]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await deleteFaq(id)
  return NextResponse.json({ success: true })
}
