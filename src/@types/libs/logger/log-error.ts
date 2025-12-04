export interface ILogError {
  error: unknown
  context?: Record<string, unknown>
  message?: string
}
