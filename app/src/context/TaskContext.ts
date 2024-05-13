import { Task } from "@/model/taskModel";
import { createContext, useContext } from "react";

export type TaskContextType = {
  tasks: Task[] | undefined;
  addTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
  editTask: (task: Task) => void;
  filteredTasks: Task[] | undefined;
  setFilterTags: (tags: string[]) => void;
};

export const TaskContext = createContext<TaskContextType | null>(null);

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
}