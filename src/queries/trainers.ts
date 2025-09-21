import instance from "@/lib/axios"
import { CreateTrainer } from "@/schemas"

const fetchTrainers = async () => {
    try {
        const response = await instance.get("/trainers")
        return response.data
    } catch (e) {
        return { trainers: [] }
    }
}

const deleteTrainer = async (id: string) => {
    try {
        const response = await instance.delete(`/trainers/${id}`)
        return response.data
    } catch (e) {
        return null
    }
}

const createTrainer = async ({ designation, experience, expertise, name, photoUrl, bio }: CreateTrainer) => {
    try {
        const response = await instance.post("/trainers", { designation, experience, expertise, name, photoUrl, bio })
        return response.data
    } catch (e) {
        return null
    }
}

const updateTrainer = async (id: string, { designation, experience, expertise, name, photoUrl, bio }: CreateTrainer) => {
    try {
        const response = await instance.put(`/trainers/${id}`, { designation, experience, expertise, name, photoUrl, bio })
        return response.data
    } catch (e) {
        return null
    }
}

export {
    fetchTrainers,
    deleteTrainer,
    createTrainer,
    updateTrainer
}