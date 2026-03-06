import type { IApiValidationErrorResponse } from '@custom-types/responses/api-validation-error-response'
import type { FastifySchemaValidationError } from 'fastify'

export function collectFastifyValidationErrors(
  validationErrors: FastifySchemaValidationError[],
): IApiValidationErrorResponse[] {
  return validationErrors.map((error) => {
    const field = error.instancePath.split('/').filter(Boolean).join('.') || 'payload'

    return {
      field,
      message: error.message || 'erro de validação de campo',
    }
  })
}
