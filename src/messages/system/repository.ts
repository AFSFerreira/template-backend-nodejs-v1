import type { ISystemResponse } from '@custom-types/responses/system-response'

export const REPOSITORY_ALREADY_EXISTS: ISystemResponse = {
  code: 'REPOSITORY_ALREADY_EXISTS',
  message: 'Chave de estratégia já existente',
}

export const INVALID_QUERY_RAW_RESULT: ISystemResponse = {
  code: 'INVALID_QUERY_RAW_RESULT',
  message: 'O resultado da query raw não pôde ser validado contra o schema esperado.',
}
