import type { Task } from "../types";

const KEY = "Task Manager_tasks";

/**
 * Load tasks from localStorage
 */
export const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to load tasks:", err);
    return [];
  }
};

/**
 * Save tasks to localStorage
 */
export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(KEY, JSON.stringify(tasks));
};