import type { ISystemResponse } from '@custom-types/responses/system-response'

export const ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR: ISystemResponse = {
  code: 'ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR',
  message: 'Erro ao iniciar o local storage da requisição',
}
