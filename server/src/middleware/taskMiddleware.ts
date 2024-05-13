import { taskSchema } from '@/model'
import { generateValidator } from '@/utils'

export const createTaskMiddleware = generateValidator({
  body: taskSchema,
})

export const updateTaskMiddleware = generateValidator({
  params: taskSchema.pick({ uuid: true }).required(),
  body: taskSchema,
})

export const deleteTaskMiddleware = generateValidator({
  params: taskSchema.pick({ uuid: true }).required(),
})
