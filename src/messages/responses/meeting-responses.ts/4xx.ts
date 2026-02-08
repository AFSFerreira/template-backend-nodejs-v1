import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 403 Forbidden =============

export const INACTIVE_MEETING_PAYMENT_INFO_UPDATE_FORBIDDEN: IApiResponse = {
  status: 403,
  body: {
    code: 'INACTIVE_MEETING_PAYMENT_INFO_UPDATE_FORBIDDEN',
    message: 'Não é permitido alterar informações de pagamento de reuniões não ativas',
  },
}

// ============= 404 Not Found =============

export const MEETING_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'MEETING_NOT_FOUND',
    message: 'Reunião não encontrada',
  },
}

// ============= 409 Conflict =============

export const ACTIVE_MEETING_ALREADY_EXISTS: IApiResponse = {
  status: 409,
  body: {
    code: 'ACTIVE_MEETING_ALREADY_EXISTS',
    message: 'Já existe uma reunião ativa no sistema',
  },
}

export const GUEST_ALREADY_REGISTERED_IN_MEETING: IApiResponse = {
  status: 409,
  body: {
    code: 'GUEST_ALREADY_REGISTERED_IN_MEETING',
    message: 'O convidado com este email já está cadastrado na reunião',
  },
}

export const MEETING_ALREADY_FINISHED: IApiResponse = {
  status: 409,
  body: {
    code: 'MEETING_ALREADY_FINISHED',
    message: 'A reunião já foi finalizada',
  },
}

export const MEETING_DATE_CONFLICT: IApiResponse = {
  status: 409,
  body: {
    code: 'MEETING_DATE_CONFLICT',
    message: 'A data da reunião conflita com uma reunião ativa existente',
  },
}

export const USER_ALREADY_REGISTERED_IN_MEETING: IApiResponse = {
  status: 409,
  body: {
    code: 'USER_ALREADY_REGISTERED_IN_MEETING',
    message: 'O usuário já está cadastrado na reunião',
  },
}
