import type { ISystemError } from '@custom-types/errors/system-error'

export const ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR: ISystemError = {
  code: 'ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR',
  message: 'Erro ao iniciar o local storage da requisição',
}
