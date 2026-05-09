import { NextRequest, NextResponse } from 'next/server'
import { getSiteContent, setSiteContentKeys } from '@/lib/data'

export async function GET() {
  const content = await getSiteContent()
  return NextResponse.json(content)
}

export async function PATCH(request: NextRequest) {
  const body = await request.json() as Record<string, string>
  await setSiteContentKeys(body)
  return NextResponse.json({ success: true })
}
