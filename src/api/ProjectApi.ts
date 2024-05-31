import api from "@/lib/axios"
import { DashboardProjectSchema, EditProjectSchema, Project, ProjectFormData,} from "../types"
import { isAxiosError } from "axios";

export async function createProject(formData : ProjectFormData){
    try {
       const { data } = await api.post('/projects',formData);
       return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAllProject(){
    try {
       const { data } = await api.get('/projects');
       const response = DashboardProjectSchema.safeParse(data)
       if(response.success){
           return response.data
       }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectById(id : Project['_id']){
    try {
       const {data} = await api.get(`/projects/${id}`)
       const response = EditProjectSchema.safeParse(data)
       if(response.success){
            return response.data;
       }

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

    type ProjectAPIType={
        formData: ProjectFormData
        projectId: Project['_id']
    }

    export async function updateProject({formData,projectId}:ProjectAPIType){
    try {
       const { data } = await api.put(`projects/${projectId}`,formData);
       return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

