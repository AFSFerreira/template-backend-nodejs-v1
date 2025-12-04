import type { IApiError } from '@custom-types/custom/api-error-type'

// Meeting-related responses
export const MEETING_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'MEETING_NOT_FOUND',
    message: 'Reunião não encontrada',
  },
}

export const MEETING_ALREADY_FINISHED: IApiError = {
  status: 409,
  body: {
    code: 'MEETING_ALREADY_FINISHED',
    message: 'A reunião já foi finalizada',
  },
}

export const USER_ALREADY_REGISTERED_IN_MEETING: IApiError = {
  status: 409,
  body: {
    code: 'USER_ALREADY_REGISTERED_IN_MEETING',
    message: 'O usuário já está cadastrado na reunião',
  },
}

export const GUEST_ALREADY_REGISTERED_IN_MEETING: IApiError = {
  status: 409,
  body: {
    code: 'GUEST_ALREADY_REGISTERED_IN_MEETING',
    message: 'O convidado com este email já está cadastrado na reunião',
  },
}
