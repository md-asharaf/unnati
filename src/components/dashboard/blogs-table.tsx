"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { BlogFormDialog } from "./blog-form-dialog";
import { CustomAlertDialog } from "./custom-alert-dialog";
import { Blog, CreateBlog, UpdateBlog } from "@/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBlog, deleteBlog, fetchBlogs, updateBlog } from "@/queries/blogs";
import { toast } from "sonner";
import Image from "next/image";

export function BlogsTable() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const queryClient = useQueryClient();
    const { data: blogs, isLoading } = useQuery({
        queryKey: ["blogs"],
        queryFn: async (): Promise<Blog[]> => {
            const { data } = await fetchBlogs()
            return data.blogs;
        }
    })

    const filteredBlogs = blogs?.filter(
        (blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.slug.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const deleteMutation = useMutation({
        mutationFn: deleteBlog,
        onSuccess: (_, slug) => {
            setIsOpen(false);
            toast.success("Blog deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            queryClient.setQueryData(["blogs"], (old: Blog[] = []) =>
                old.filter((blog) => blog.slug !== slug),
            );
        },
        onError: () => {
            setIsOpen(false);
            toast.error("Failed to delete blog. Please try again.");
        }
    })

    const updatemutation = useMutation({
        mutationFn: async (values: UpdateBlog) => {
            if (!editingBlog) return;
            const { data } = await updateBlog(editingBlog?.slug!, values)
            return data.blog;
        },
        onSuccess: (updateBlog) => {
            if (!updateBlog) return;
            toast.success("Blog updated successfully!")
            queryClient.setQueryData(["blogs"], (old: Blog[] = []) => old.map((blog) => blog.slug === updateBlog.slug ? updateBlog : blog))
        },
        onError: (error) => {
            toast.error("Failed to update blog. Please try again.")
        }
    })
    const createMutation = useMutation({
        mutationFn: async (values: CreateBlog) => {
            const { data } = await createBlog(values)
            return data.blog;
        },
        onSuccess: (newBlog) => {
            if (!newBlog) return;
            toast.success("Blog created successfully!")
            queryClient.setQueryData(["blogs"], (old: Blog[] = []) => [...old, newBlog])
            setIsCreateDialogOpen(false);
        },
        onError: (error) => {
            toast.error("Failed to create blog. Please try again.")
        }
    })

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">
                        Blog Posts
                    </CardTitle>
                    <Button
                        onClick={() => setIsCreateDialogOpen(true)}
                        className="gap-2 bg-accent hover:bg-accent/80"
                    >
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
                        {filteredBlogs?.length} blog
                        {filteredBlogs?.length !== 1 ? "s" : ""}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Thumbnail</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Updated</TableHead>
                                <TableHead className="w-16">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBlogs?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        {searchTerm
                                            ? "No blogs found matching your search."
                                            : "No blogs created yet."}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredBlogs?.map((blog) => (
                                    <TableRow key={blog.slug}>
                                        <TableCell>
                                            <Image
                                                src={
                                                    blog.thumbnail?.url ||
                                                    "/placeholder.svg"
                                                }
                                                width={50}
                                                height={50}
                                                alt={blog.title}
                                                className="h-12 w-12 rounded-md object-cover"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium max-w-xs">
                                            <div
                                                className="truncate"
                                                title={blog.title}
                                            >
                                                {blog.title}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground font-mono text-sm">
                                            {blog.slug}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        className="gap-2"
                                                        onClick={() =>
                                                            setEditingBlog(blog)
                                                        }
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="gap-2 text-destructive"
                                                        onClick={() =>
                                                            setIsOpen(true)
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <CustomAlertDialog
                                                isOpen={isOpen}
                                                onCancel={() =>
                                                    setIsOpen(false)
                                                }
                                                onContinue={() =>
                                                    deleteMutation.mutate(blog.slug)
                                                }
                                            />
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
                onSubmit={(data) =>
                    createMutation.mutate({
                        ...data,
                        thumbnail: data.thumbnail!,
                    })
                }
                title="Create New Blog"
            />

            <BlogFormDialog
               key={editingBlog?.slug || "edit-dialog"}
                open={!!editingBlog}
                onOpenChange={(open) => !open && setEditingBlog(null)}
                onSubmit={(data) => updatemutation.mutate(data)}
                title="Edit Blog"
                initialData={editingBlog || undefined}
            />
        </Card>
    );
}
