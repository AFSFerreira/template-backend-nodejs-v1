import type { ISystemError } from '@custom-types/custom/system-error-types'

export const ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR: ISystemError = {
  code: 'ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR',
  message: 'Erro ao iniciar o local storage da requisição',
}
