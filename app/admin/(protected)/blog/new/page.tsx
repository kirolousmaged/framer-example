import BlogPostForm from '../_components/BlogPostForm'

export default function NewBlogPostPage() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <h1 className="font-italiana text-4xl text-off-black">New Post</h1>
        <p className="font-raleway text-sm text-off-black/50 mt-1">
          Create a new blog post.
        </p>
      </div>
      <BlogPostForm />
    </div>
  )
}
