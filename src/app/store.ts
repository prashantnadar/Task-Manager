import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";
import { loadTasks, saveTasks } from "../utils/localStorage";

/**
 * Load persisted tasks from localStorage
 * Returns: Task[]
 */
const persistedTasks = loadTasks();

/**
 * Redux Store Configuration
 */
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },

  // Correct shape: tasks should directly be an array
  preloadedState: {
    tasks: {
      tasks: persistedTasks || [],
    },
  },
});

/**
 * Persist store changes → localStorage
 */
store.subscribe(() => {
  const state = store.getState();

  // only persist tasks array
  saveTasks(state.tasks.tasks);
});

/**
 * Typed hooks support
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;