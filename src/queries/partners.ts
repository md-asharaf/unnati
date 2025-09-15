import instance from "@/lib/axios"

const fetchPartners = async (page = 1, limit = 10) => {
  const response = await instance.get("/images", {
    params: {
      type: "PARTNER",
      page,
      limit
    }
  })
  return response.data
}

const deletePartner = async (id: string) => {
  const response = await instance.delete(`/partners/${id}`)
  return response.data
}

const uploadPartner = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)

  const response = await instance.post("/partners", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return response.data
}

export {
  fetchPartners,
  deletePartner,
  uploadPartner
}
