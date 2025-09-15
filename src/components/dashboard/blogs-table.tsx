"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { BlogFormDialog } from "./blog-form-dialog"

interface Blog {
    id: string
    title: string
    slug: string
    content: string
    thumbnail: string
    updatedAt: string
}

// Mock data for demonstration
const mockBlogs: Blog[] = [
    {
        id: "1",
        title: "Getting Started with Next.js 15",
        slug: "getting-started-nextjs-15",
        content: "Learn how to build modern web applications with Next.js 15...",
        thumbnail: "/nextjs-blog-thumbnail.jpg",
        updatedAt: "2024-01-15",
    },
    {
        id: "2",
        title: "Modern UI Design Principles",
        slug: "modern-ui-design-principles",
        content: "Explore the latest trends in user interface design...",
        thumbnail: "/ui-design-blog-thumbnail.jpg",
        updatedAt: "2024-01-14",
    },
    {
        id: "3",
        title: "Building Scalable APIs",
        slug: "building-scalable-apis",
        content: "Best practices for creating robust and scalable APIs...",
        thumbnail: "/api-development-blog-thumbnail.jpg",
        updatedAt: "2024-01-13",
    },
]

export function BlogsTable() {
    const [blogs, setBlogs] = useState<Blog[]>(mockBlogs)
    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null)

    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.slug.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleCreateBlog = (blogData: Omit<Blog, "id" | "updatedAt">) => {
        const newBlog: Blog = {
            ...blogData,
            id: Date.now().toString(),
            updatedAt: new Date().toISOString().split("T")[0],
        }
        setBlogs([newBlog, ...blogs])
        setIsCreateDialogOpen(false)
    }

    const handleUpdateBlog = (blogData: Omit<Blog, "id" | "updatedAt">) => {
        if (!editingBlog) return

        const updatedBlog: Blog = {
            ...editingBlog,
            ...blogData,
            updatedAt: new Date().toISOString().split("T")[0],
        }

        setBlogs(blogs.map((blog) => (blog.id === editingBlog.id ? updatedBlog : blog)))
        setEditingBlog(null)
    }

    const handleDeleteBlog = (id: string) => {
        setBlogs(blogs.filter((blog) => blog.id !== id))
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Blog Posts</CardTitle>
                    <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2 bg-accent hover:bg-accent/80" >
                        <Plus className="h-4 w-4" />
                        Create Blog
                    </Button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? "s" : ""}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Thumbnail</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Updated</TableHead>
                                <TableHead className="w-16">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBlogs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                        {searchTerm ? "No blogs found matching your search." : "No blogs created yet."}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <TableRow key={blog.id}>
                                        <TableCell>
                                            <img
                                                src={blog.thumbnail || "/placeholder.svg"}
                                                alt={blog.title}
                                                className="h-12 w-12 rounded-md object-cover"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium max-w-xs">
                                            <div className="truncate" title={blog.title}>
                                                {blog.title}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-sm">{blog.slug}</TableCell>
                                        <TableCell className="text-muted-foreground">{blog.updatedAt}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="gap-2" onClick={() => setEditingBlog(blog)}>
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="gap-2 text-destructive"
                                                        onClick={() => handleDeleteBlog(blog.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>

            <BlogFormDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                onSubmit={handleCreateBlog}
                title="Create New Blog"
            />

            <BlogFormDialog
                open={!!editingBlog}
                onOpenChange={(open) => !open && setEditingBlog(null)}
                onSubmit={handleUpdateBlog}
                title="Edit Blog"
                initialData={editingBlog || undefined}
            />
        </Card>
    )
}
