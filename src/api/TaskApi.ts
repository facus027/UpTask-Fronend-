import api from "@/lib/axios"
import { isAxiosError } from "axios";
import { Project, TaskFormData } from "../types";

type TaskApi = {
    formData: TaskFormData
    projectId: Project['_id']
}

export async function createTask({formData,projectId} : TaskApi) {
    try {
        const url = `/projects/${projectId}/task`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}