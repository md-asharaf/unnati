import { ArrowUpRight } from "lucide-react"
import { Card} from "@/components/ui/card"
import Link from "next/link"
import { Blog } from "@/schemas"
import Image from "next/image"

interface BlogPostProps {
    post: Blog
    index: number
}

export function BlogPost({ post, index }: BlogPostProps) {
    const formatDate = (date: Date) => {
        return new Date(date)
            .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })
            .toUpperCase()
    }

    return (
        <Card className="flex flex-col border overflow-hidden w-full p-0 transition-all duration-300 hover:shadow-lg hover:border-primary group">
            <div className="relative w-full aspect-video">
                {post.imageId ? (
                    <Image
                        src={post.thumbnail?.url || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">No image</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 p-3">
                <time className="text-xs mb-1 text-muted-foreground">{formatDate(post.createdAt)}</time>
                <h3 className="text-base font-semibold mb-1 line-clamp-2 transition-colors duration-300 group-hover:text-primary">{post.title}</h3>
                <div>
                    <Link href={`/blogs/${post.slug}`} className="text-sm text-primary flex items-center gap-1 font-mono transition-colors duration-300 hover:text-primary/80">
                        READ MORE 
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>
            </div>
        </Card>
    )
}
