/**
 * Task Slice (Redux Toolkit)
 * Handles all task state operations in a predictable immutable way
 */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Task, TaskStatus } from "../../types";
import { loadTasks } from "../../utils/localStorage";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: loadTasks(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /**
     * Add new task
     */
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    },

    /**
     * Update full task
     */
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    /**
     * Delete task
     */
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },

    /**
     * Change task status only
     */
    updateStatus: (
      state,
      action: PayloadAction<{ id: string; status: TaskStatus }>
    ) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },

    /**
     * Replace all tasks (hydration support)
     */
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  updateStatus,
  setTasks,
} = taskSlice.actions;

export default taskSlice.reducer;