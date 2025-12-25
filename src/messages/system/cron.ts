import type { ISystemError } from '@custom-types/custom/system-error-types'

export const INVALID_CRON_ERROR: ISystemError = {
  code: 'INVALID_CRON_ERROR',
  message: 'Expressão cron inválida',
}
