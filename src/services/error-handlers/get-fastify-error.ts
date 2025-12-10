import type { IApiError } from '@custom-types/custom/api-error-type'
import type { FastifyError } from 'fastify'
import {
  BODY_REQUIRED,
  INTERNAL_SERVER_ERROR,
  INVALID_BODY_FORMAT_JSON,
  MAX_MULTIPART_FILE_SIZE_LIMIT,
} from '@messages/responses/common-responses'

export function getFastifyError(error: FastifyError): IApiError {
  if (error.code === 'FST_ERR_CTP_EMPTY_JSON_BODY') {
    return BODY_REQUIRED
  }

  if (error.code === 'FST_ERR_CTP_INVALID_JSON_BODY') {
    return INVALID_BODY_FORMAT_JSON
  }

  if (error.code === 'FST_ERR_CTP_MULTIPART_FILE_SIZE_LIMIT') {
    return MAX_MULTIPART_FILE_SIZE_LIMIT
  }

  return INTERNAL_SERVER_ERROR
}
