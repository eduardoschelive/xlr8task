import { createTag, deleteTag, getTag, getTags, updateTag } from "@/database";
import { asyncHandler } from "@/lib";
import { createTagMiddleware, deleteTagMiddleware, updateTagMiddleware } from "@/middleware/tagMiddleware";
import { Request, Response, Router } from "express";

const router = Router()

router.get('/tags', asyncHandler(async (_: Request, res: Response) => {
  const tasks = await getTags()
  res.status(200).json(tasks)
}))

router.get('/tags/:uuid', asyncHandler(async (req: Request, res: Response) => {
  const { uuid } = req.params
  const task = await getTag(uuid)
  res.status(200).json(task)
}))

router.post('/tags', createTagMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const createdTask = await createTag(req.body)
  res.status(200).json(createdTask)
}))

router.put('/tags/:uuid', updateTagMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { uuid } = req.params
  const updatedTask = await updateTag(uuid, req.body)
  res.status(200).json(updatedTask)
}))

router.delete('/tags/:uuid', deleteTagMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { uuid } = req.params

  await deleteTag(uuid)

  res.status(204).send()
}))

export const taskRouter = router