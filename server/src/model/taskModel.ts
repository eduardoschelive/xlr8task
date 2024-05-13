import { isoStringRegex } from '@/utils/regex'
import { z } from 'zod'
import { tagSchema } from './tagModel'

export const taskSchema = z.object({
  uuid: z
    .string({
      message: 'O uuid deve ser um texto válido',
      required_error: 'O uuid é obrigatório',
      description: 'O identificador único da tarefa',
    })
    .uuid({
      message: 'O uuid deve ser um identificador único válido',
    })
    .optional(),
  title: z.string({
    message: 'O título deve ser um texto válido e não pode ser vazio',
    required_error: 'O título é obrigatório',
    description: 'O título da tarefa',
  }),
  startDate: z
    .string({
      message: 'O startDate deve ser uma data e hora válida',
      required_error: 'O startDate é obrigatório',
      description: 'A data e hora da tarefa',
    })
    .regex(isoStringRegex, {
      message: 'O startDate deve estar no formato ISO 8601',
    }),
  endDate: z
    .string({
      message: 'O endDate deve ser uma data e hora válida',
      required_error: 'O endDate é obrigatório',
      description: 'A data e hora da tarefa',
    })
    .regex(isoStringRegex, {
      message: 'O endDate deve estar no formato ISO 8601',
    }),
  tags: z.array(
    z.string({
      message: 'O tag deve ser um texto válido',
      required_error: 'O tag é obrigatório',
      description: 'O identificador único da tag',
    }).uuid({
      message: 'O tag deve ser um identificador único válido',
    })
  ).optional(),
  description: z.string({
    message: 'A descrição deve ser um texto válido',
    required_error: 'A descrição é obrigatória',
    description: 'A descrição da tarefa',
  }),
})

export type Task = z.infer<typeof taskSchema>
