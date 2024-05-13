import { ErrorResponse } from './errorResponse'

export type BadParameterField = {
  [key: string]: string
}

export type BadParametersResponse = ErrorResponse & {
  fields: BadParameterField
}
