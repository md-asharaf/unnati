import instance from "@/lib/axios"
import { CreateTrainer } from "@/schemas"

const fetchTrainers = async () => {
    const response = await instance.get("/trainers")
    return response.data
}

const deleteTrainer = async (id: string) => {
    const response = await instance.delete(`/trainers/${id}`)
    return response.data
}

const createTrainer = async ({ designation, experience, expertise, name, photoUrl, bio }: CreateTrainer) => {
    const response = await instance.post("/trainers", {
        designation,
        experience,
        expertise,
        name,
        photoUrl,
        bio
    })
    return response.data
}

const updateTrainer = async (id: string, { designation, experience, expertise, name, photoUrl, bio }: CreateTrainer) => {
    const response = await instance.put(`/trainers/${id}`, {
        designation,
        experience,
        expertise,
        name,
        photoUrl,
        bio
    })
    return response.data
}

export {
    fetchTrainers,
    deleteTrainer,
    createTrainer,
    updateTrainer
}