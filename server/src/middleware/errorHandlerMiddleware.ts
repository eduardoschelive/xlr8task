import { ErrorResponse } from '@/types'
import { AppError } from '@/utils'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (error: AppError, req: Request, res: Response, _: NextFunction) => {
  const { message, stack, httpCode, name, timestamp, additionalInfo } = error
  const statusCode = httpCode || 500
  const errorName = name || 'Internal Server Error'

  const { url } = req

  const responseBody: ErrorResponse = {
    status: statusCode,
    name: errorName,
    message,
    path: url,
    timestamp: timestamp,
    ...additionalInfo,
    stack,
  }

  res.status(statusCode).json(responseBody)
}
