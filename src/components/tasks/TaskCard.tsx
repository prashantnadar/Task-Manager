import type { Task } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { deleteTask, updateStatus } from "../../features/tasks/taskSlice";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
}

function TaskCard({ task, onEdit }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 border rounded-xl bg-white dark:bg-gray-900 space-y-2">

      {/* TITLE */}
      <h3 className="font-semibold">{task.title}</h3>

      {/* META */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>Priority: {task.priority}</p>
        <p>Status: {task.status}</p>
        {task.dueDate && <p>Due: {task.dueDate}</p>}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-2 pt-2">

        {/* STATUS CHANGE */}
        <select
          value={task.status}
          onChange={(e) =>
            dispatch(
              updateStatus({
                id: task.id,
                status: e.target.value as any,
              })
            )
          }
          className="text-sm border rounded px-2 py-1 dark:bg-gray-800"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* EDIT */}
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Edit
        </button>

        {/* DELETE */}
        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default TaskCard;