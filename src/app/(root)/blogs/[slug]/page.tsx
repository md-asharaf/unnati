import { db } from "@/lib/db";
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation"


export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const blog = await db.blog.findUnique({
        where: { slug },
        include: { thumbnail: true }
    });
    if (!blog) {
        notFound()
    }
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    }

    const estimatedReadTime = Math.ceil(blog.content.split(" ").length / 200)

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 py-16 max-w-4xl">
                {/* Back button */}
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Back to All blogs
                </Link>

                {/* Article header */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light text-foreground text-balance mb-8">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <time>{formatDate(blog.createdAt)}</time>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{estimatedReadTime} min read</span>
                        </div>
                    </div>
                </header>

                {/* Article content */}
                <article className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                    <div className="whitespace-pre-line leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </article>
            </div>
        </div>
    )
}
