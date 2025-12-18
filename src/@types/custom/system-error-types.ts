export interface ISystemError {
  code: string
  message: string
  issues?: Record<string, unknown>
}
