import Image from "next/image";
import { AnimatedHeading } from "../animated-heading";
import { Blog } from "@/schemas";
import { Link } from "next-view-transitions";
interface BlogsProps {
  blogs: Blog[];
}

export const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <section className="w-full py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-4 flex flex-col items-center max-w-6xl mx-auto">
      <AnimatedHeading text="Latest Blogs" />
      <div className="w-full mt-8 sm:mt-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 px-1">
        {blogs.slice(0,6).map((blog, idx) => (
          <Link
            key={idx}
            href={`/blogs/${blog.slug}`}
            className="group relative rounded-lg overflow-hidden shadow border bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all"
          >
            <Image
              src={blog.thumbnail?.url || "/placeholder.svg"}
              alt={`Blog ${idx + 1}`}
              width={640}
              height={360}
              className="object-cover w-full aspect-video group-hover:brightness-105 group-active:scale-[.99] transition-all"
            />
          </Link>
        ))}
      </div>
        <div className="mt-8 sm:mt-10">
          <Link
            href={"/blogs"}
            className="inline-flex bg-accent text-accent-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-medium shadow hover:bg-accent/90 transition-colors text-sm sm:text-base"
          >
            More Blogs
          </Link>
        </div>
    </section>
  );
};
