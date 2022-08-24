import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "./todoSlice";
import tasksReducer from "./taskSlice";

export const store = configureStore({
  reducer: {
    todo: todosReducer,
    task: tasksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
