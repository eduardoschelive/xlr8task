import { TaskContext } from "@/context/TaskContext";
import { useTasksQuery } from "@/hooks/useTasksQuery";
import { PropsWithChildren, useState } from "react";

export const TaskContextProvider = ({ children }: PropsWithChildren) => {
  const [filterTags, setFilterTags] = useState<string[]>([]);

  const { addTask, editTask, removeTask, tasks } = useTasksQuery();

  const filteredTasks = tasks?.filter(task => {
    if (!filterTags.length) return true;
    return task.tags?.some(tag => filterTags.includes(tag));
  })

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, editTask, setFilterTags, filteredTasks }}>
      {children}
    </TaskContext.Provider>
  );
}