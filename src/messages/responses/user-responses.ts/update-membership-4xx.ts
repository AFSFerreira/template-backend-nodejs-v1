import type { IApiResponse } from '@custom-types/responses/api-response'

export const CANNOT_UPDATE_MEMBERSHIP_STATUS_VERIFYING_OR_PENDING: IApiResponse = {
  status: 400,
  body: {
    code: 'CANNOT_UPDATE_MEMBERSHIP_STATUS_VERIFYING_OR_PENDING',
    message: 'Não é possível atualizar o status de membro de usuários com status VERIFYING ou PENDING',
  },
}

export const ADMIN_CANNOT_BE_INACTIVATED: IApiResponse = {
  status: 403,
  body: {
    code: 'ADMIN_CANNOT_BE_INACTIVATED',
    message: 'O status de membro de administradores não pode ser inativado',
  },
}
