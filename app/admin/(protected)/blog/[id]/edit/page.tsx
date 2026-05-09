import { getPostById } from '@/lib/data'
import { notFound } from 'next/navigation'
import BlogPostForm from '../../_components/BlogPostForm'

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostById(id)
  if (!post) notFound()

  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <h1 className="font-italiana text-4xl text-off-black">Edit Post</h1>
        <p className="font-raleway text-sm text-off-black/50 mt-1 truncate">
          {post.title}
        </p>
      </div>
      <BlogPostForm
        postId={post.id}
        initialValues={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          published: post.published,
        }}
      />
    </div>
  )
}
