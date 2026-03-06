import type { IApiErrorResponse } from '@custom-types/responses/api-error-response'
import type { FastifySchemaValidationError } from 'fastify'

export function collectFastifyValidationErrors(validationErrors: FastifySchemaValidationError[]): IApiErrorResponse[] {
  return validationErrors.map((error) => {
    const field = error.instancePath.split('/').filter(Boolean).join('.') || 'payload'

    return {
      field,
      message: error.message || 'erro de validação de campo',
    }
  })
}
