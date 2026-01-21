import type { IApiError } from '@custom-types/errors/api-error'
import { ApiError } from '@errors/api-error'
import { SystemError } from '@errors/system-error'
import { SYNTAX_ERROR, VALIDATION_ERROR } from '@messages/responses/common-responses.ts/4xx'
import { INTERNAL_SERVER_ERROR } from '@messages/responses/common-responses.ts/5xx'
import { isFastifyError } from '@services/guards/is-fastify-error'
import z, { ZodError } from 'zod'
import { getFastifyError } from './get-fastify-error'

export function getBusinessError(error: Error): IApiError | SystemError {
  if (error instanceof ZodError) {
    const issues = z.treeifyError(error)
    return {
      ...VALIDATION_ERROR,
      body: {
        ...VALIDATION_ERROR.body,
        issues,
      },
    }
  }

  if (isFastifyError(error)) {
    return getFastifyError(error)
  }

  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof SystemError) {
    return error
  }

  if (error instanceof SyntaxError) {
    return SYNTAX_ERROR
  }

  return INTERNAL_SERVER_ERROR
}
