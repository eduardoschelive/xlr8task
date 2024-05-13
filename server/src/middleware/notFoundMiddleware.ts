import { asyncHandler } from '@/lib'
import { AppError } from '@/utils'

export const notFoundMiddleware = asyncHandler(async () => {
  throw new AppError(404, 'Rota não encontrada')
})
