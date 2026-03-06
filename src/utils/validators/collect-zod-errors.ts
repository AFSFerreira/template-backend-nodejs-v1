import type { IApiValidationErrorResponse } from '@custom-types/responses/api-validation-error-response'
import type { ZodError } from 'zod'

export function collectZodErrors(error: ZodError): IApiValidationErrorResponse[] {
  return error.issues.map((issue) => {
    const field = issue.path.join('.') || 'payload'

    return {
      field,
      message: issue.message,
    }
  })
}
