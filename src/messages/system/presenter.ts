import type { ISystemResponse } from '@custom-types/responses/system-response'

export const PRESENTER_STRATEGY_NOT_FOUND: ISystemResponse = {
  code: 'PRESENTER_STRATEGY_NOT_FOUND',
  message: 'Estratégia de presenter não encontrada',
}

export const PRESENTER_STRATEGY_ALREADY_EXISTS: ISystemResponse = {
  code: 'PRESENTER_STRATEGY_ALREADY_EXISTS',
  message: 'Chave de estratégia já existente',
}
