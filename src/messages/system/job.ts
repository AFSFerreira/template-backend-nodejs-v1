import type { ISystemError } from '@custom-types/errors/system-error'

export const JOB_NAME_ALREADY_EXISTS: ISystemError = {
  code: 'JOB_NAME_ALREADY_EXISTS',
  message: 'O job registrado já existe',
}
