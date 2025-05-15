export interface ISystemResponse {
  code: string
  message: string
  issues?: Record<string, unknown>
}
