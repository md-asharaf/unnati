import instance from "@/lib/axios"
import { CreateCompany, UpdateCompany } from "@/schemas"

const fetchCompanies = async (page = 1, limit = 10, isPremium?: boolean) => {
  const response = await instance.get("/companies", {
    params: {
      page,
      limit,
      isPremium
    }
  })
  return response.data
}

const deleteCompany = async (id: string) => {
  const response = await instance.delete(`/companies/${id}`)
  return response.data
}

const createCompany = async ({ logo, isPremium, name }: CreateCompany) => {
  const formData = new FormData()
  formData.append("logo", logo)
  formData.append("isPremium", isPremium.toString())
  formData.append("name", name)

  const response = await instance.post("/companies", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return response.data
}

const updateCompany = async (id: string, { logo, isPremium, name }: UpdateCompany) => {
  const formData = new FormData()
  if (logo) {
    formData.append("file", logo)
  }
  formData.append("isPremium", isPremium.toString())
  formData.append("name", name)

  const response = await instance.patch(`/companies/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return response.data
}

export {
  fetchCompanies,
  deleteCompany,
  createCompany,
  updateCompany
}
