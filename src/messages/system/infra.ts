import type { ISystemError } from '@custom-types/errors/system-error'

export const INFRA_ALREADY_EXISTS: ISystemError = {
  code: 'INFRA_ALREADY_EXISTS',
  message: 'Serviço de infraestrutura já registrado',
}
