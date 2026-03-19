import type { RootState } from "../../app/store";

/**
 * Base state selector
 */
const selectTaskState = (state: RootState) => state.tasks.tasks;

/**
 * RAW selector (NO memoization needed)
 */
export const selectTasks = (state: RootState) => selectTaskState(state);

/**
 * Derived selectors ONLY where filtering happens
 */
export const selectTodo = (state: RootState) =>
  state.tasks.tasks.filter((t) => t.status === "todo");

export const selectInProgress = (state: RootState) =>
  state.tasks.tasks.filter((t) => t.status === "in-progress");

export const selectDone = (state: RootState) =>
  state.tasks.tasks.filter((t) => t.status === "done");