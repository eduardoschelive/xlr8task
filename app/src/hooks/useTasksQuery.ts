import { Task } from "@/model/taskModel";
import { taskService } from "@/service/taskService";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useTasksQuery = () => {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, isError } = useQuery('tasks', taskService.getTasks);

  const addTaskMutation = useMutation(taskService.createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const addTask = async (task: Task) => {
    await addTaskMutation.mutateAsync(task);
  };

  const removeTaskMutation = useMutation(taskService.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const removeTask = async (taskId: string) => {
    await removeTaskMutation.mutateAsync(taskId);
  };

  const editTaskMutation = useMutation(taskService.updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const editTask = async (task: Task) => {
    await editTaskMutation.mutateAsync(task);
  };

  return { tasks, isLoading, isError, addTask, removeTask, editTask };
}