import { logger } from '..'

interface ILogError {
  error: unknown
  context?: Record<string, unknown>
  message: string
}

export function logError(
  { error, context = {}, message = 'Unexpected error' }: ILogError
) {
  logger.error(
    {
      ...(error instanceof Error
        ? {
            message: error.message,
            stack: error.stack,
          }
        : {
            message: 'Unknown error',
          }),
      ...context,
    },
    message,
  )
}
