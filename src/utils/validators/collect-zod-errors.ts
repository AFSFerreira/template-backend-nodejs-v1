import type { IApiValidationErrorResponse } from '@custom-types/responses/api-validation-error-response'
import type { ZodError } from 'zod'

/**
 * Coleta e normaliza erros de validação do Zod para o formato padrão da API.
 *
 * Converte o `path` do Zod (array de segmentos) para notação de ponto.
 * Se o path estiver vazio, utiliza `'payload'` como fallback.
 *
 * @param error - Instância de `ZodError` com os issues de validação.
 * @returns Array de erros formatados com `field` e `message`.
 *
 * @example
 * collectZodErrors(zodError)
 * // [{ field: 'user.email', message: 'Email inválido' }]
 */
export function collectZodErrors(error: ZodError): IApiValidationErrorResponse[] {
  return error.issues.map((issue) => {
    const field = issue.path.join('.') || 'payload'

    return {
      field,
      message: issue.message,
    }
  })
}
