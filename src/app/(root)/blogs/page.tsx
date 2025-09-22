import { BlogPost } from "@/components/blog-post"
import { db } from "@/lib/db"

export default async function BlogsPage() {
    const blogs = await db.blog.findMany({
        include:{
            thumbnail:true
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 9
    })
    return (
        <div className="container mx-auto px-4 py-6 space-y-10 md:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 place-items-center max-w-md mx-auto md:max-w-none">
                {blogs?.map((blog, index) => (
                    <BlogPost key={blog.slug} post={blog} index={index} />
                ))}
            </div>
        </div>
    )
}