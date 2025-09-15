"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon, Trash } from "lucide-react"

interface Blog {
  id: string
  title: string
  slug: string
  content: string
  thumbnail: string
  updatedAt: string
}

interface BlogFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Omit<Blog, "id" | "createdAt" | "updatedAt">) => void
  title: string
  initialData?: Blog
}

export function BlogFormDialog({ open, onOpenChange, onSubmit, title, initialData }: BlogFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    thumbnail: "",
  })
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("")

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        slug: initialData.slug,
        content: initialData.content,
        thumbnail: initialData.thumbnail,
      })
      setThumbnailPreview(initialData.thumbnail)
    } else {
      setFormData({
        title: "",
        slug: "",
        content: "",
        thumbnail: "",
      })
      setThumbnailPreview("")
    }
  }, [initialData, open])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }))
  }

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setThumbnailPreview(result)
        setFormData((prev) => ({ ...prev, thumbnail: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.content) return

    const thumbnailUrl =
      formData.thumbnail ||
      `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(formData.title + " blog thumbnail")}`

    onSubmit({
      ...formData,
      thumbnail: thumbnailUrl,
    })

    // Reset form
    setFormData({
      title: "",
      slug: "",
      content: "",
      thumbnail: "",
    })
    setThumbnailPreview("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter blog title..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="blog-url-slug"
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Thumbnail</Label>
              <Card className="relative border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
                <CardContent className="p-6">
                  {thumbnailPreview ? (
                    <div className="">
                      <img
                        src={thumbnailPreview || "/placeholder.svg"}
                        alt="Thumbnail preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setThumbnailPreview("")
                          setFormData((prev) => ({ ...prev, thumbnail: "" }))
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Upload a thumbnail image for your blog post</p>
                            <Button
                                type="button"
                                variant="outline"
                                className="gap-2 bg-accent"
                                onClick={() => document.getElementById("thumbnail-upload")?.click()}
                            >
                                <Upload className="h-4 w-4" />
                                Choose Image
                            </Button>
                            <Input
                                id="thumbnail-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Write your blog content here..."
                className="min-h-[200px] resize-y"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update Blog" : "Create Blog"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
