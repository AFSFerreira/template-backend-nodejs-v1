import type { IApiErrorResponse } from '@custom-types/responses/api-error-response'
import type { ZodError } from 'zod'

export function collectZodErrors(error: ZodError): IApiErrorResponse[] {
  return error.issues.map((issue) => {
    const field = issue.path.join('.') || 'payload'

    return {
      field,
      message: issue.message,
    }
  })
}
