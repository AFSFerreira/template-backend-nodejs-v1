import type { ISystemError } from '@custom-types/errors/system-error'

export const REPOSITORY_ALREADY_EXISTS: ISystemError = {
  code: 'REPOSITORY_ALREADY_EXISTS',
  message: 'Chave de estratégia já existente',
}
