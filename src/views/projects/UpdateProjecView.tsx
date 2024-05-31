import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom"
import { getProjectById } from "@/api/ProjectApi";
import EditProjectForm from "@/components/projects/EditProjectForm";

export default function UpdateProjecView() {
   
    const param = useParams()
    const projectId = param.projectId;

    const {data,isLoading,isError} = useQuery({
        queryKey:['editproject',projectId],
        queryFn: () =>getProjectById(projectId!),
        retry:2
    })

    console.log(projectId)
    console.log(data)
    console.log(isError)

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'/>
    if(data) return <EditProjectForm project={data} projectId={projectId!}/>


  
}
