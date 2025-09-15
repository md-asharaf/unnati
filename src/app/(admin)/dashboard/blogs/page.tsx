import { BlogsTable } from "@/components/dashboard/blogs-table";

export default function BlogsPage() {
  return (
      <div className="flex flex-1 flex-col gap-4 sm:max-w-6xl mx-auto w-full space-y-8 p-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-balance">Blog Management</h1>
            <p className="text-muted-foreground text-pretty">
              Create, edit, and manage your blog posts with a modern interface.
            </p>
          </div>
          <BlogsTable />
        </div>
  )
}
