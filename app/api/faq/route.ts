import { NextRequest, NextResponse } from 'next/server'
import { getFaqs, createFaq } from '@/lib/data'
import { randomUUID } from 'crypto'

export async function GET() {
  const faqs = await getFaqs()
  return NextResponse.json(faqs)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const faq = await createFaq({
      id: randomUUID(),
      question: body.question,
      answer: body.answer,
    })
    return NextResponse.json(faq, { status: 201 })
  } catch (err) {
    console.error('[POST /api/faq]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
