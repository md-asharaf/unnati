import instance from "@/lib/axios"
import { CreateBlog, UpdateBlog } from "@/schemas"

const fetchBlogs = async (page = 1, limit = 10) => {
    const response = await instance.get("/blogs", {
        params: {
            page,
            limit
        }
    })
    return response.data
}

const deleteBlog = async (slug: string) => {
    const response = await instance.delete(`/blogs/${slug}`)
    return response.data
}

const createBlog = async ({ title, content, slug, thumbnail }: CreateBlog) => {
    const formData = new FormData()
    formData.append("thumbnail", thumbnail)
    formData.append("title", title)
    formData.append("content", content)
    formData.append("slug", slug)
    const response = await instance.post("/blogs", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

const updateBlog = async (slug: string, { title, content, slug: newSlug, thumbnail }: UpdateBlog) => {
    const formData = new FormData()
    if (thumbnail) {
        formData.append("thumbnail", thumbnail)
    }
    formData.append("title", title)
    formData.append("content", content)
    formData.append("slug", newSlug)
    const response = await instance.patch(`/blogs/${slug}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export {
    fetchBlogs,
    deleteBlog,
    createBlog,
    updateBlog
}