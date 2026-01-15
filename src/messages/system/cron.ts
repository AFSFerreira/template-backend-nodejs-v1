import type { ISystemError } from '@custom-types/errors/system-error'

export const INVALID_CRON_ERROR: ISystemError = {
  code: 'INVALID_CRON_ERROR',
  message: 'Expressão cron inválida',
}
