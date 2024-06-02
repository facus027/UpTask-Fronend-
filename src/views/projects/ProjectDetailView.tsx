import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getProjectById } from "@/api/ProjectApi";
import AddTaskModal from "@/components/task/AddTaskModal";
import TasksList from "@/components/task/TasksList";


export default function ProjectDetailView() {

  const navigate = useNavigate()

  const param = useParams()
  const projectId = param.projectId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['viewproject', projectId],
    queryFn: () => getProjectById(projectId!),
    retry: false
  })

  console.log(data);

  if (isLoading) return 'Cargando...'
  if (isError) return <Navigate to='/404' />
  if (data) return (
    <>
      <h1 className=" text-5xl font-black">{data.projectName}</h1>
      <p className=" text-2xl font-light text-gray-500 mt-5" >{data.description}</p>

      <nav className=" my-5 flex gap-3">
        <button
          type='button'
          className=" bg-purple-400 hover:bg-purple-500 px-8 py-3 text-white text-xl font-bold
             cursor-pointer transition-colors rounded-md "
          onClick={() => navigate(location.pathname + '?newTask=true')}
        >
          Agregar Tarea
        </button>
      </nav>

      <TasksList tasks={data.tasks} />

      <AddTaskModal />
    </>
  )

}
