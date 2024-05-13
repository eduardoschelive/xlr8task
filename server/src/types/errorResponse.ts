export type ErrorResponse = {
  status: number
  name: string
  message: string
  path: string
  timestamp: string
  stack?: string
}
