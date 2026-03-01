import type { ISystemResponse } from '@custom-types/responses/system-response'

export const UNREACHABLE_CASE: ISystemResponse = {
  code: 'UNREACHABLE_CASE',
  message: 'Caso não esperado atingido durante a execução',
}
