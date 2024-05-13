import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '@/database'
import { asyncHandler } from '@/lib'
import {
  createTaskMiddleware,
  deleteTaskMiddleware,
  updateTaskMiddleware,
} from '@/middleware'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/tasks', asyncHandler(async (_: Request, res: Response) => {
  const tasks = await getTasks()
  res.status(200).json(tasks)
}))

router.get('/tasks/:uuid', asyncHandler(async (req: Request, res: Response) => {
  const { uuid } = req.params
  const task = await getTask(uuid)
  res.status(200).json(task)
}))

router.post('/tasks', createTaskMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const createdTask = await createTask(req.body)
  res.status(200).json(createdTask)
}))

router.put('/tasks/:uuid', updateTaskMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { uuid } = req.params
  const updatedTask = await updateTask(uuid, req.body)
  res.status(200).json(updatedTask)
}))

router.delete('/tasks/:uuid', deleteTaskMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { uuid } = req.params

  await deleteTask(uuid)

  res.status(204).send()
}))

export const tagRouter = router
