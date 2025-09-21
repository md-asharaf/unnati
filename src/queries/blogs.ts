import instance from "@/lib/axios"
import { CreateBlog, UpdateBlog } from "@/schemas"

const fetchBlogs = async (page = 1, limit = 10) => {
    try {
        const response = await instance.get("/blogs", { params: { page, limit } })
        return response.data
    } catch (e) {
        return { blogs: [], page, limit, total: 0 }
    }
}

const fetchBlog = async (slug: string) => {
    try {
        const response = await instance.get(`/blogs/${slug}`)
        return response.data
    } catch (e) {
        return null
    }
}

const deleteBlog = async (slug: string) => {
    try {
        const response = await instance.delete(`/blogs/${slug}`)
        return response.data
    } catch (e) {
        return null
    }
}

const createBlog = async ({ title, content, slug, thumbnail }: CreateBlog) => {
    try {
        const formData = new FormData()
        formData.append("thumbnail", thumbnail)
        formData.append("title", title)
        formData.append("content", content)
        formData.append("slug", slug)
        const response = await instance.post("/blogs", formData, { headers: { "Content-Type": "multipart/form-data" } })
        return response.data
    } catch (e) {
        return null
    }
}

const updateBlog = async (slug: string, { title, content, slug: newSlug, thumbnail }: UpdateBlog) => {
    try {
        const formData = new FormData()
        if (thumbnail) formData.append("thumbnail", thumbnail)
        formData.append("title", title)
        formData.append("content", content)
        formData.append("slug", newSlug)
        const response = await instance.patch(`/blogs/${slug}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
        return response.data
    } catch (e) {
        return null
    }
}

export {
    fetchBlogs,
    fetchBlog,
    deleteBlog,
    createBlog,
    updateBlog
}