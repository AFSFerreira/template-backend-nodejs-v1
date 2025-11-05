import type { IApiError } from '@custom-types/api-error-type'
import {
  MULTER_LIMIT_FILE_SIZE,
  MULTER_LIMIT_FILE_COUNT,
  MULTER_LIMIT_FIELD_KEY,
  MULTER_LIMIT_FIELD_VALUE,
  MULTER_LIMIT_FIELD_COUNT,
  MULTER_LIMIT_UNEXPECTED_FILE,
  MULTER_LIMIT_PART_COUNT,
  MULTER_MISSING_FIELD_NAME,
  MULTER_UNKNOWN_ERROR,
} from '@messages/responses'
import type { MulterError } from 'multer'

export function getMulterError(error: Error): IApiError {
  switch ((error as MulterError).code) {
    case 'LIMIT_FILE_SIZE':
      return MULTER_LIMIT_FILE_SIZE

    case 'LIMIT_FILE_COUNT':
      return MULTER_LIMIT_FILE_COUNT

    case 'LIMIT_FIELD_KEY':
      return MULTER_LIMIT_FIELD_KEY

    case 'LIMIT_FIELD_VALUE':
      return MULTER_LIMIT_FIELD_VALUE

    case 'LIMIT_FIELD_COUNT':
      return MULTER_LIMIT_FIELD_COUNT

    case 'LIMIT_UNEXPECTED_FILE':
      return MULTER_LIMIT_UNEXPECTED_FILE

    case 'LIMIT_PART_COUNT':
      return MULTER_LIMIT_PART_COUNT

    case 'MISSING_FIELD_NAME':
      return MULTER_MISSING_FIELD_NAME

    default:
      return MULTER_UNKNOWN_ERROR
  }
}
