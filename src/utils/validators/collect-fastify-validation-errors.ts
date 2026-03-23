import type { IApiValidationErrorResponse } from '@custom-types/responses/api-validation-error-response'
import type { FastifySchemaValidationError } from 'fastify'

/**
 * Coleta e normaliza erros de validação de schema do Fastify para o formato padrão da API.
 *
 * Converte o `instancePath` do AJV (formato `/field/nested`) para notação de ponto
 * (`field.nested`). Se o path estiver vazio, utiliza `'payload'` como fallback.
 *
 * @param validationErrors - Array de erros de validação do Fastify (AJV).
 * @returns Array de erros formatados com `field` e `message`.
 *
 * @example
 * collectFastifyValidationErrors([{ instancePath: '/user/email', message: 'must be string' }])
 * // [{ field: 'user.email', message: 'must be string' }]
 *
 * collectFastifyValidationErrors([{ instancePath: '', message: 'required' }])
 * // [{ field: 'payload', message: 'required' }]
 */
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
