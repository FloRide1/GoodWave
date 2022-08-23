import { TaskState } from "./TaskState";

export interface Task {
  id: string;
  title: string;
  description: string;
  state: TaskState;
}
