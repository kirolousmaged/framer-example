import { NextRequest, NextResponse } from 'next/server'
import { getSubmissionById, updateSubmission, deleteSubmission } from '@/lib/data'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const submission = await getSubmissionById(id)
  if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(submission)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const submission = await updateSubmission(id, {
      status: body.status,
      adminNotes: body.adminNotes,
    })
    if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(submission)
  } catch (err) {
    console.error('[PUT /api/submissions/[id]]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await deleteSubmission(id)
  return NextResponse.json({ success: true })
}
