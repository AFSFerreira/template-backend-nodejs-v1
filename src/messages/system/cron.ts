import type { ISystemResponse } from '@custom-types/responses/system-response'

export const INVALID_CRON_ERROR: ISystemResponse = {
  code: 'INVALID_CRON_ERROR',
  message: 'Expressão cron inválida',
}
