import { Task } from "./Task";

export interface TaskList {
  name: string;
  items: Array<Task>;
  frontColor: string;
  backColor: string;
}
