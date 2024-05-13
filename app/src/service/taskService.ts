import { Task } from "@/model/taskModel";
import { AxiosPromise } from "axios";
import { http } from "./http";

const endpoint = '/tasks'

const convertTaskDates = (task: Task): Task => ({
  ...task,
  startDate: new Date(task.startDate),
  endDate: new Date(task.endDate),
});

const getTasks = async (): Promise<Task[]> => {
  const { data } = await http.get(endpoint) 
  const tasks = data.map(convertTaskDates)
  return tasks;
}

const createTask = async (task: Task): Promise<Task> => {
  const { data } = await http.post(endpoint, task)
  return convertTaskDates(data)
}

const updateTask = async (task: Task): Promise<Task> => {
  const { data } = await http.put(`${endpoint}/${task.uuid}`, task)
  return convertTaskDates(data)
}

const deleteTask = async (taskId: string): AxiosPromise => {
  return http.delete(`${endpoint}/${taskId}`)
}

export const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}