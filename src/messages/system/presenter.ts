import type { ISystemError } from '@custom-types/errors/system-error'

export const PRESENTER_STRATEGY_NOT_FOUND: ISystemError = {
  code: 'PRESENTER_STRATEGY_NOT_FOUND',
  message: 'Estratégia de presenter não encontrada',
}

export const PRESENTER_STRATEGY_ALREADY_EXISTS: ISystemError = {
  code: 'PRESENTER_STRATEGY_ALREADY_EXISTS',
  message: 'Chave de estratégia já existente',
}
