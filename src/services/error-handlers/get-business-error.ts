import type { IApiResponse } from '@custom-types/responses/api-response'
import { ApiError } from '@errors/api-error'
import { SystemError } from '@errors/system-error'
import { SYNTAX_ERROR, VALIDATION_ERROR } from '@messages/responses/common-responses/4xx'
import { INTERNAL_SERVER_ERROR } from '@messages/responses/common-responses/5xx'
import { isFastifyError } from '@services/guards/is-fastify-error'
import { collectZodErrors } from '@utils/validators/collect-errors'
// import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import z, { ZodError } from 'zod'
import { getFastifyError } from './get-fastify-error'

export function getBusinessError(error: Error): IApiResponse | SystemError {
  if (error instanceof ZodError) {
    const treeifiedError = z.treeifyError(error)
    const issues = collectZodErrors(treeifiedError)

    return {
      ...VALIDATION_ERROR,
      body: {
        ...VALIDATION_ERROR.body,
        issues,
      },
    }
  }

  // if (hasZodFastifySchemaValidationErrors(error)) {
  //   const treeifiedError = z.treeifyError(error.validation)
  //   const issues = collectZodErrors(treeifiedError)

  //   return {
  //     ...VALIDATION_ERROR,
  //     body: {
  //       ...VALIDATION_ERROR.body,
  //       issues: error.validation,
  //     },
  //   }
  // }

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
