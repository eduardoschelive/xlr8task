import { asyncHandler } from '@/lib'
import { BadParameterField } from '@/types'
import { NextFunction, Request, Response } from 'express'
import { ParsedUrlQuery } from 'querystring'
import { AnyZodObject, ZodIssue } from 'zod'
import { AppError } from '../utils/AppError'

type ValidatorSchemas = {
  body?: AnyZodObject
  query?: AnyZodObject
  params?: AnyZodObject
}

const validate = async (schema: AnyZodObject | undefined, data: any) => {
  if (!schema) {
    return undefined
  }

  return await schema.safeParseAsync(data)
}

export const generateValidator = (schemas: ValidatorSchemas) => asyncHandler(async (req: Request, _: Response, next: NextFunction) => {
  const {
    body: bodySchema,
    query: querySchema,
    params: paramSchema,
  } = schemas

  const validatedBody = await validate(bodySchema, req.body)
  const validatedQuery = await validate(querySchema, req.query)
  const validatedParams = await validate(paramSchema, req.params)

  const errors = [validatedBody, validatedQuery, validatedParams]
    .filter((result) => result && !result.success)
    .flatMap((result) => result?.error?.errors || [])

  if (errors.length > 0) {
    throw buildError(errors)
  }

  req.body = validatedBody?.data
  req.query = validatedQuery?.data as ParsedUrlQuery

  next()
})

const buildError = (
  errors: ZodIssue[]
): AppError => {
  const statusCode = 400

  const error = new AppError(statusCode, 'Parâmetros inválidos', {
    badParameters: mapErrorsToResponse(errors),
  })

  return error
}

const mapErrorsToResponse = (errors: ZodIssue[]): BadParameterField => {
  return errors.reduce((acc, error) => {
    const { path, message } = error
    return {
      ...acc,
      [path.join('.')]: message,
    }
  }, {})
}
