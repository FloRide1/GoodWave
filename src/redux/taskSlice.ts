import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { Task } from "../models/Task";
import { TaskList } from "../models/TaskList";

const initialState: Array<TaskList> = [];

// TODO
initialState.push({
  name: "TODO",
  items: [],
  frontColor: "tomato",
  backColor: "firebrick",
});

// IN PROGRESS
initialState.push({
  name: "IN PROGRESS",
  items: [],
  frontColor: "orange",
  backColor: "darkorange",
});

// DONE
initialState.push({
  name: "DONE",
  items: [],
  frontColor: "green",
  backColor: "darkgreen",
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    pushTask: {
      reducer: (
        state,
        action: PayloadAction<{ list_index: number; task: Task }>
      ) => {
        state[action.payload.list_index].items.push(action.payload.task);
      },
      prepare: (list_index: number, title: string, description: string) => {
        return {
          payload: {
            list_index: list_index,
            task: {
              id: uuidv4(),
              title,
              description,
            } as Task,
          },
        };
      },
    },

    addTask: {
      reducer: (
        state,
        action: PayloadAction<{ list_index: number; index: number; task: Task }>
      ) => {
        state[action.payload.list_index].items.splice(
          action.payload.index,
          0,
          action.payload.task
        );
      },
      prepare: (list_index: number, index: number, task: Task) => {
        return {
          payload: {
            list_index: list_index,
            index: index,
            task: task,
          },
        };
      },
    },

    removeTask: {
      reducer: (
        state,
        action: PayloadAction<{ list_index: number; index: number }>
      ) => {
        state[action.payload.list_index].items.splice(action.payload.index, 1);
      },
      prepare: (list_index: number, index: number) => {
        return {
          payload: {
            list_index: list_index,
            index: index,
          },
        };
      },
    },

    setTask: {
      reducer: (
        state,
        action: PayloadAction<{ list_index: number; index: number; task: Task }>
      ) => {
        state[action.payload.list_index].items[action.payload.index] =
          action.payload.task;
      },
      prepare: (list_index: number, index: number, task: Task) => {
        return {
          payload: {
            list_index: list_index,
            index: index,
            task: task,
          },
        };
      },
    },

    reorderTask: {
      reducer: (
        state,
        action: PayloadAction<{
          list_index: number;
          startIndex: number;
          endIndex: number;
        }>
      ) => {
        const [removed] = state[action.payload.list_index].items.splice(
          action.payload.startIndex,
          1
        );
        state[action.payload.list_index].items.splice(
          action.payload.endIndex,
          0,
          removed
        );
      },
      prepare: (list_index: number, startIndex: number, endIndex: number) => {
        return {
          payload: {
            list_index: list_index,
            startIndex: startIndex,
            endIndex: endIndex,
          },
        };
      },
    },
  },
});

export const { pushTask, addTask, removeTask, setTask, reorderTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
