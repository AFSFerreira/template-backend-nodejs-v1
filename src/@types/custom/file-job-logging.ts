export interface FileJobLogging {
  logging?: {
    errorMessage: string
    context?: Record<string, unknown>
  }
}
