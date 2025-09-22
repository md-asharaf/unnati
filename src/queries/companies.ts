import instance from "@/lib/axios"
import { CreateCompany, UpdateCompany } from "@/schemas"

const fetchCompanies = async (page = 1, limit = 10, isPremium?: boolean) => {
  try {
    const response = await instance.get("/companies", { params: { page, limit, isPremium } })
    return response.data
  } catch (e) {
    return { companies: [], page, limit, total: 0 }
  }
}

const deleteCompany = async (id: string) => {
  try {
    const response = await instance.delete(`/companies/${id}`)
    return response.data
  } catch (e) {
    return null
  }
}

const createCompany = async ({ logo, isPremium, name }: CreateCompany) => {
  try {
    const formData = new FormData()
    formData.append("logo", logo)
    formData.append("isPremium", isPremium.toString())
    formData.append("name", name)
    const response = await instance.post("/companies", formData, { headers: { "Content-Type": "multipart/form-data" } })
    return response.data
  } catch (e) {
    return null
  }
}

const updateCompany = async (id: string, { logo, isPremium, name }: UpdateCompany) => {
  try {
    const formData = new FormData()
    if (logo) formData.append("logo", logo)
    formData.append("isPremium", isPremium.toString())
    formData.append("name", name)
    const response = await instance.patch(`/companies/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    return response.data
  } catch (e) {
    return null
  }
}

export {
  fetchCompanies,
  deleteCompany,
  createCompany,
  updateCompany
}
