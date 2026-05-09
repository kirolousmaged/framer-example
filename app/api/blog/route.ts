import { NextRequest, NextResponse } from 'next/server'
import { getPosts, createPost } from '@/lib/data'
import { randomUUID } from 'crypto'

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function GET() {
  const posts = await getPosts()
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const post = await createPost({
      id: randomUUID(),
      slug: body.slug || slugify(body.title),
      title: body.title,
      excerpt: body.excerpt ?? '',
      content: body.content ?? '',
      image: body.image ?? '',
      published: body.published ?? false,
    })
    return NextResponse.json(post, { status: 201 })
  } catch (err) {
    console.error('[POST /api/blog]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
