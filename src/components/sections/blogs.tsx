import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { AnimatedHeading } from "../animated-heading";

export interface Blog {
  slug: string;
  imageUrl: string;
}

interface BlogsProps {
  blogs: Blog[];
  onMoreBlogs?: () => void;
}

export const Blogs = ({ blogs, onMoreBlogs }: BlogsProps) => {
  return (
    <section className="w-full py-12 px-2 md:px-0 flex flex-col items-center max-w-6xl mx-auto" >
      <AnimatedHeading text="Latest Blogs" />
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 m-8">
        {blogs.map((blog, idx) => (
          <Link
            key={idx}
            href={`/blogs/${blog.slug}`}
            className="block max-w-md h-[220px] rounded-lg overflow-hidden shadow hover:sm:scale-105 transition-transform bg-primary border"
          >
            <Image
              src={blog.imageUrl}
              alt={`Blog ${idx + 1}`}
              width={350}
              height={220}
              className="object-cover w-full h-full"
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
