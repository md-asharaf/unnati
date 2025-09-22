import { BlogPost } from "@/components/blog-post"
import { fetchBlogs } from "@/queries/blogs"
import { Blog } from "@/schemas"

export default async function BlogsPage() {
    const { data } = await fetchBlogs(1, 10)
    const posts = data.blogs as Blog[]
    return (
        <div className="container mx-auto px-4 py-6 space-y-10 md:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 place-items-center max-w-md mx-auto md:max-w-none">
                {posts.map((post, index) => (
                    <BlogPost key={post.slug} post={post} index={index} />
                ))}
            </div>
        </div>
    )
}