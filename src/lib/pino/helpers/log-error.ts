import type { ILogError } from '@custom-types/lib/pino/log-error'
import { logger } from '..'

export function logError({ error, context = {}, message = 'Unexpected error' }: ILogError) {
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
