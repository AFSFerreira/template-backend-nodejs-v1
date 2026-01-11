import type { ISystemError } from '@custom-types/custom/system-error-types'

export const INFRA_ALREADY_EXISTS: ISystemError = {
  code: 'INFRA_ALREADY_EXISTS',
  message: 'Serviço de infraestrutura já registrado',
}
