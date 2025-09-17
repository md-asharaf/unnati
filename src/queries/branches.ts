import instance from "@/lib/axios"
import { CreateBranch } from "@/schemas"

const fetchBranches = async () => {
    const response = await instance.get("/branches")
    return response.data
}

const deleteBranch = async (id: string) => {
    const response = await instance.delete(`/branches/${id}`)
    return response.data
}

const createBranch = async ({ address, latitude, longitude, name, phone }: CreateBranch) => {
    const response = await instance.post("/branches", {
        address,
        latitude,
        longitude,
        name,
        phone
    })
    return response.data
}

const updateBranch = async (id: string, { address, latitude, longitude, name, phone }: CreateBranch) => {
    const response = await instance.put(`/branches/${id}`, {
        address,
        latitude,
        longitude,
        name,
        phone
    })
    return response.data
}

export {
    fetchBranches,
    deleteBranch,
    createBranch,
    updateBranch
}