import instance from "@/lib/axios"
import { CreateBranch } from "@/schemas"

const fetchBranches = async () => {
    try {
        const response = await instance.get("/branches")
        return response.data
    } catch (e) {
        return { branches: [] }
    }
}

const deleteBranch = async (id: string) => {
    try {
        const response = await instance.delete(`/branches/${id}`)
        return response.data
    } catch (e) {
        return null
    }
}

const createBranch = async ({ address, latitude, longitude, name, phone }: CreateBranch) => {
    try {
        const response = await instance.post("/branches", { address, latitude, longitude, name, phone })
        return response.data
    } catch (e) {
        return null
    }
}

const updateBranch = async (id: string, { address, latitude, longitude, name, phone }: CreateBranch) => {
    try {
        const response = await instance.put(`/branches/${id}`, { address, latitude, longitude, name, phone })
        return response.data
    } catch (e) {
        return null
    }
}

export {
    fetchBranches,
    deleteBranch,
    createBranch,
    updateBranch
}