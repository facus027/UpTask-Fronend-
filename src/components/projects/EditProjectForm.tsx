import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ProjectForm from "@/components/projects/ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { updateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  project: ProjectFormData
  projectId: Project['_id']
}

export default function EditProjectForm({ project, projectId }: EditProjectFormProps) {

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clientName: project.clientName,
      projectName: project.projectName,
      description: project.description,
    }
  });

  //React Query

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['editproject', projectId] })
      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)
  }

  return (
    <>
      <div className=" max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Actializar Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para Actualizar el Proyecto
        </p>

        <nav className="my-5">
          <Link
            className=" bg-purple-400 hover:bg-purple-600 px-10 py-3 text-white text-xl 
        font-bold cursor-pointer transition-colors"
            to="/"
          >
            Volver A Proyectos
          </Link>
        </nav>

        <form
          className=" mt-10 bg-white shadow-lg p-10 rounder-lg"
          // @ts-ignore
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Actualizar Proyecto"
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase
         font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
