import type { apiErrorResponseSchema } from '@lib/swagger/schemas/api-response-schema'
import type z from 'zod'
import type { IApiValidationErrorResponse } from './api-validation-error-response'

export interface IApiResponseBody extends z.infer<typeof apiErrorResponseSchema> {
  issues?: IApiValidationErrorResponse[]
}

export interface IApiResponse {
  status: number
  body: IApiResponseBody
}
