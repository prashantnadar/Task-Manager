/**
 * Home Dashboard
 * Professional Task Manager UI layer
 */

import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import type { Task, TaskPriority } from "../types";
import {
  addTask,
  updateTask,
} from "../features/tasks/taskSlice";

import {
  selectTasks,
  selectTodo,
  selectInProgress,
  selectDone,
} from "../features/tasks/taskTypes";

import TaskCard from "../components/tasks/TaskCard";
import { saveTasks } from "../utils/localStorage";

function Home() {
  const dispatch = useAppDispatch();

  // =========================
  // GLOBAL STATE
  // =========================
  const tasks = useAppSelector(selectTasks);
  const todo = useAppSelector(selectTodo);
  const inProgress = useAppSelector(selectInProgress);
  const done = useAppSelector(selectDone);

  // =========================
  // UI STATE
  // =========================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [filter, setFilter] =
    useState<"all" | "todo" | "in-progress" | "done">("all");

  // =========================
  // FORM STATE
  // =========================
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  // =========================
  // PERSISTENCE
  // =========================
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // =========================
  // MODAL HANDLERS
  // =========================
  const openCreateModal = () => {
    setIsEditMode(false);
    setEditingTask(null);

    setTitle("");
    setPriority("medium");
    setDueDate("");

    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setIsEditMode(true);
    setEditingTask(task);

    setTitle(task.title);
    setPriority(task.priority);
    setDueDate(task.dueDate || "");

    setIsModalOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setPriority("medium");
    setDueDate("");
  };

  // =========================
  // SAVE LOGIC (CREATE + UPDATE)
  // =========================
  const handleSave = () => {
    if (!title.trim()) return;

    if (isEditMode && editingTask) {
      dispatch(
        updateTask({
          ...editingTask,
          title,
          priority,
          dueDate,
        })
      );
    } else {
      dispatch(
        addTask({
          id: crypto.randomUUID(),
          title,
          priority,
          dueDate,
          status: "todo",
          createdAt: new Date().toISOString(),
        })
      );
    }

    resetForm();
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingTask(null);
  };

  // =========================
  // FILTERED DATA
  // =========================
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">TaskFlow Dashboard</h1>
          <p className="text-gray-500">
            Manage tasks like a pro 🚀
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          + Add Task
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-3">
        <div className="p-4 border rounded">Total: {tasks.length}</div>
        <div className="p-4 border rounded">Todo: {todo.length}</div>
        <div className="p-4 border rounded">Progress: {inProgress.length}</div>
        <div className="p-4 border rounded">Done: {done.length}</div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2">
        {["all", "todo", "in-progress", "done"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-3 py-1 border rounded ${
              filter === f ? "bg-black text-white" : ""
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TASK LIST */}
      <div className="grid gap-3">
        {filteredTasks.length === 0 ? (
          <div className="p-6 border rounded text-center text-gray-500">
            No tasks found 🚀
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditModal}
            />
          ))
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[90%] max-w-md">

            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit Task" : "Create Task"}
            </h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="w-full p-2 border rounded mb-3"
            />

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as TaskPriority)
              }
              className="w-full p-2 border rounded mb-3"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-3 py-1 bg-black text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Home;