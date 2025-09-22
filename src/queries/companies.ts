import instance from "@/lib/axios"
import { Company, CreateCompany, UpdateCompany } from "@/schemas"
import { ApiResponse, Pagination } from "@/types/interfaces"

interface MultipleCompanyResponse extends Pagination { companies: Company[] }
interface SingleCompanyResponse { company: Company }

type MultipleCompanyApiResponse = ApiResponse<MultipleCompanyResponse>
type SingleCompanyApiResponse = ApiResponse<SingleCompanyResponse>

const fetchCompanies = async (page = 1, limit = 10, isPremium?: boolean) => {
  try {
    const response = await instance.get<MultipleCompanyApiResponse>("/companies", { params: { page, limit, isPremium } })
    return response.data.data!
  } catch (e) {
    return { companies: [], page, limit, total: 0, totalPages: 0 }
  }
}

const deleteCompany = async (id: string) => {
  try {
    const response = await instance.delete<SingleCompanyApiResponse>(`/companies/${id}`)
    return response.data.data!
  } catch (e) {
    return { company: null }
  }
}

const createCompany = async ({ logo, isPremium, name }: CreateCompany) => {
  try {
    const formData = new FormData()
    formData.append("logo", logo)
    formData.append("isPremium", isPremium.toString())
    formData.append("name", name)
    const response = await instance.post<SingleCompanyApiResponse>("/companies", formData, { headers: { "Content-Type": "multipart/form-data" } })
    return response.data.data!
  } catch (e) {
    return { company: null }
  }
}

const updateCompany = async (id: string, { logo, isPremium, name }: UpdateCompany) => {
  try {
    const formData = new FormData()
    if (logo) formData.append("logo", logo)
    formData.append("isPremium", isPremium.toString())
    formData.append("name", name)
    const response = await instance.patch<SingleCompanyApiResponse>(`/companies/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    return response.data.data!
  } catch (e) {
    return { company: null }
  }
}

export {
  fetchCompanies,
  deleteCompany,
  createCompany,
  updateCompany
}
