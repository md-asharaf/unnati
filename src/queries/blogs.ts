import instance from "@/lib/axios"
import { Blog, CreateBlog, UpdateBlog } from "@/schemas"
import { ApiResponse, Pagination } from "@/types/interfaces"
interface MultipleBlogResponse extends Pagination {
    blogs: Blog[]
}
interface SingleBlogResponse {
    blog: Blog
}

type MultipleBlogApiResponse = ApiResponse<MultipleBlogResponse>
type SingleBlogApiResponse = ApiResponse<SingleBlogResponse>

const fetchBlogs = async (page = 1, limit = 10) => {
    try {
        const response = await instance.get<MultipleBlogApiResponse>("/blogs", { params: { page, limit } })
        return response.data.data!;
    } catch (e) {
        return { blogs: [], page, limit, total: 0, totalPages: 0 }
    }
}

const fetchBlog = async (slug: string) => {
    try {
        const response = await instance.get<SingleBlogApiResponse>(`/blogs/${slug}`)
        return response.data.data!;
    } catch (e) {
        return {
            blog: null
        }
    }
}

const deleteBlog = async (slug: string) => {
    try {
        const response = await instance.delete<SingleBlogApiResponse>(`/blogs/${slug}`)
        return response.data.data!;
    } catch (e) {
        return {
            blog: null
        }
    }
}

const createBlog = async ({ title, content, slug, thumbnail }: CreateBlog) => {
    try {
        const formData = new FormData()
        formData.append("thumbnail", thumbnail)
        formData.append("title", title)
        formData.append("content", content)
        formData.append("slug", slug)
        const response = await instance.post<SingleBlogApiResponse>("/blogs", formData, { headers: { "Content-Type": "multipart/form-data" } })
        return response.data.data!;
    } catch (e) {
        return {
            blog: null
        }
    }
}

const updateBlog = async (slug: string, { title, content, slug: newSlug, thumbnail }: UpdateBlog) => {
    try {
        const formData = new FormData()
        if (thumbnail) formData.append("thumbnail", thumbnail)
        formData.append("title", title)
        formData.append("content", content)
        formData.append("slug", newSlug)
        const response = await instance.patch<SingleBlogApiResponse>(`/blogs/${slug}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
        return response.data.data!;
    } catch (e) {
        return {
            blog: null
        }
    }
}

export {
    fetchBlogs,
    fetchBlog,
    deleteBlog,
    createBlog,
    updateBlog
}