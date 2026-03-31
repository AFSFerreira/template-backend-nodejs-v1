import type { IApiResponse } from '@custom-types/responses/api-response'
import { ApiError } from '@errors/api-error'
import { SystemError } from '@errors/system-error'
import { logger } from '@lib/pino'
import {
  API_ERROR_MESSAGE,
  FASTIFY_ERROR,
  SYNTAX_ERROR_MESSAGE,
  SYSTEM_ERROR_MESSAGE,
} from '@messages/loggings/system/common-loggings'
import { SYNTAX_ERROR, VALIDATION_ERROR } from '@messages/responses/common-responses/4xx'
import { INTERNAL_SERVER_ERROR } from '@messages/responses/common-responses/5xx'
import { isFastifyError } from '@utils/guards/is-fastify-error'
import { collectFastifyValidationErrors } from '@utils/validators/collect-fastify-validation-errors'
import { collectZodErrors } from '@utils/validators/collect-zod-errors'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { ZodError } from 'zod'
import { getFastifyError } from './get-fastify-error'

/**
 * Classifica um erro em sua resposta HTTP correspondente.
 *
 * Ordem de prioridade:
 * 1. `ZodError` → 422 Validation Error com issues formatadas.
 * 2. Zod-Fastify schema validation → 422 com issues do Fastify.
 * 3. `FastifyError` → mapeamento específico (body vazio, JSON inválido, file size limit).
 * 4. `ApiError` → resposta customizada do erro de negócio.
 * 5. `SystemError` → retornado para tratamento especial no handler.
 * 6. `SyntaxError` → 400 Syntax Error.
 * 7. Demais erros → 500 Internal Server Error.
 *
 * @param error - Erro capturado pelo Fastify.
 * @returns Resposta HTTP formatada ou `SystemError` para tratamento pelo handler.
 */
export function getBusinessError(error: Error): IApiResponse | SystemError {
  if (error instanceof ZodError) {
    const issues = collectZodErrors(error)

    logger.warn(error, VALIDATION_ERROR.body.message)

    return {
      ...VALIDATION_ERROR,
      body: {
        ...VALIDATION_ERROR.body,
        issues,
      },
    }
  }

  if (hasZodFastifySchemaValidationErrors(error)) {
    const issues = collectFastifyValidationErrors(error.validation)

    logger.warn(error, VALIDATION_ERROR.body.message)

    return {
      ...VALIDATION_ERROR,
      body: {
        ...VALIDATION_ERROR.body,
        issues,
      },
    }
  }

  if (isFastifyError(error)) {
    const fastifyError = getFastifyError(error)

    logger.warn(
      {
        ...error,
        ...fastifyError,
      },
      FASTIFY_ERROR,
    )

    return fastifyError
  }

  if (error instanceof ApiError) {
    logger.warn(error, API_ERROR_MESSAGE)

    return error
  }

  if (error instanceof SystemError) {
    logger.warn(error, SYSTEM_ERROR_MESSAGE)

    return error
  }

  if (error instanceof SyntaxError) {
    logger.warn(error, SYNTAX_ERROR_MESSAGE)

    return SYNTAX_ERROR
  }

  logger.error(error, INTERNAL_SERVER_ERROR.body.message)

  return INTERNAL_SERVER_ERROR
}
