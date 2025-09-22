import instance from "@/lib/axios"
import { Branch, CreateBranch } from "@/schemas"
import { ApiResponse } from "@/types/interfaces"

interface MultipleBranchResponse { branches: Branch[] }
interface SingleBranchResponse { branch: Branch }

type MultipleBranchApiResponse = ApiResponse<MultipleBranchResponse>
type SingleBranchApiResponse = ApiResponse<SingleBranchResponse>

const fetchBranches = async () => {
    try {
        const res = await instance.get<MultipleBranchApiResponse>("/branches")
        return res.data.data!;
    } catch (e) {
        return { branches: [] }
    }
}

const deleteBranch = async (id: string) => {
    try {
        const response = await instance.delete<SingleBranchApiResponse>(`/branches/${id}`)
        return response.data.data!;
    } catch (e) {
        return { branch: null }
    }
}

const createBranch = async ({ address, latitude, longitude, name, phone }: CreateBranch) => {
    try {
        const response = await instance.post<SingleBranchApiResponse>("/branches", { address, latitude, longitude, name, phone })
        return response.data.data!;
    } catch (e) {
        return { branch: null }
    }
}

const updateBranch = async (id: string, { address, latitude, longitude, name, phone }: CreateBranch) => {
    try {
        const response = await instance.put<SingleBranchApiResponse>(`/branches/${id}`, { address, latitude, longitude, name, phone })
        return response.data.data!;
    } catch (e) {
        return { branch: null }
    }
}

export {
    fetchBranches,
    deleteBranch,
    createBranch,
    updateBranch
}