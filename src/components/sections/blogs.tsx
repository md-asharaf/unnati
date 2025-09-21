import Image from "next/image";
import Link from "next/link";
import { AnimatedHeading } from "../animated-heading";
import { Blog } from "@/schemas";
interface BlogsProps {
  blogs: Blog[];
}

export const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <section className="w-full py-12 px-2 md:px-0 flex flex-col items-center max-w-6xl mx-auto" >
      <AnimatedHeading text="Latest Blogs" />
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 m-8">
        {blogs.map((blog, idx) => (
          <Link
            key={idx}
            href={`/blogs/${blog.slug}`}
            className="block max-w-md h-[220px] rounded overflow-hidden shadow hover:sm:scale-105 transition-transform bg-primary border"
          >
            <Image
              src={blog.thumbnail?.url || "/placeholder.svg"}
              alt={`Blog ${idx + 1}`}
              width={100}
              height={100}
              className="object-cover aspect-video w-full h-full"
            />
          </Link>
        ))}
      </div>
      <Link
            href={"/blogs"}
                className="bg-accent text-accent-foreground px-8 py-3 rounded-sm font-medium shadow hover:bg-accent/90 transition-colors"
            >
                More Blogs
            </Link>
    </section>
  );
};
