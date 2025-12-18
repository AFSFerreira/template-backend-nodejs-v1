import type { ISystemError } from '@custom-types/custom/system-error-types'

export const INVALID_CRON_ERROR: ISystemError = {
  code: 'INVALID_CRON_ERROR',
  message: 'Expressão cron inválida',
}

export const PRESENTER_STRATEGY_NOT_FOUND: ISystemError = {
  code: 'PRESENTER_STRATEGY_NOT_FOUND',
  message: 'Estratégia de presenter não encontrada',
}

export const PRESENTER_STRATEGY_ALREADY_EXISTS: ISystemError = {
  code: 'PRESENTER_STRATEGY_ALREADY_EXISTS',
  message: 'Chave de estratégia já existente',
}

export const JOB_NAME_ALREADY_EXISTS: ISystemError = {
  code: 'JOB_NAME_ALREADY_EXISTS',
  message: 'O job registrado já existe',
}
