import { Task } from "@/types/index"
import TaskCard from "./TaskCard"

type TasksListProps = {
    tasks: Task[]
}

type GroupedTask = {
    [key: string]: Task[]
}

const initialStatusGroup: GroupedTask = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

export default function TasksList({ tasks }: TasksListProps) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroup);

    console.log(groupedTasks)

    return (
        <>
            <h2 className="text-5xl font-black my-10 w-full">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] xl:min-w-0 xl:w-1/5'>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}
