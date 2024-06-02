import { z } from 'zod'

export const ProjectSchema= z.object({
    _id: z.string(),
    clientName: z.string(),
    projectName: z.string(),
    description: z.string(),
})

export const DashboardProjectSchema = z.array(
    ProjectSchema.pick({
        _id:true,
        clientName:true,
        projectName:true,
        description:true,
    })
)

export const EditProjectSchema = ProjectSchema.pick({
        clientName:true,
        projectName:true,
        description:true,
    })

export type Project= z.infer<typeof ProjectSchema>

export type ProjectFormData= Pick<Project, 'clientName' | 'projectName' | 'description' >

//Task

export const TaskStatusSchema = z.enum(['pending', 'onHold' , 'inProgress' , 'underReview' , 'completed'])

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema 
})

export type Task = z.infer<typeof TaskSchema>

export type TaskFormData = Pick<Task, 'name' | 'description'>