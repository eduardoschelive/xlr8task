import { currentDateInISO } from "./date"

export type HttpCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500

export const commonErrorsDictionary = {
  404: 'Recurso não encontrado',
  500: 'Erro interno do servidor',
}

export class AppError extends Error {
  public readonly name: string
  public readonly httpCode: HttpCode
  public readonly timestamp: string
  public readonly additionalInfo?: Record<string, any>

  constructor(
    httpCode: HttpCode,
    description: string,
    additionalInfo?: Record<string, any>
  ) {
    super(description)
    this.name = commonErrorsDictionary[httpCode]
    this.httpCode = httpCode
    this.timestamp = currentDateInISO()
    this.additionalInfo = additionalInfo

    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }

}