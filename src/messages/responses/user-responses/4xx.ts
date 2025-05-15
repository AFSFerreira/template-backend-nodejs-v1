import type { IApiResponse } from '@custom-types/responses/api-response'
import { StatusCodes } from 'http-status-codes'

// ============= 400 Bad Request =============

export const EMAIL_VERIFICATION_NOT_REQUESTED: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'EMAIL_VERIFICATION_NOT_REQUESTED',
    message: 'Verificação de e-mail não foi solicitada para este usuário',
  },
}

export const INVALID_EMAIL_DOMAIN: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'INVALID_EMAIL_DOMAIN',
    message: 'O domínio do e-mail fornecido é inválido ou não possui registros MX válidos',
  },
}

export const INCORRECT_OLD_PASSWORD: IApiResponse = {
  status: StatusCodes.UNAUTHORIZED,
  body: {
    code: 'INCORRECT_OLD_PASSWORD',
    message: 'A senha antiga fornecida está incorreta',
  },
}

export const INVALID_CREDENTIALS: IApiResponse = {
  status: StatusCodes.UNAUTHORIZED,
  body: {
    code: 'INVALID_CREDENTIALS',
    message: 'Credenciais inválidas',
  },
}

export const INVALID_OR_EXPIRED_TOKEN: IApiResponse = {
  status: StatusCodes.UNAUTHORIZED,
  body: {
    code: 'INVALID_OR_EXPIRED_TOKEN',
    message: 'Token inválido ou expirado',
  },
}

export const PASSWORD_RECOVERY_NOT_REQUESTED_BY_USER: IApiResponse = {
  status: StatusCodes.UNAUTHORIZED,
  body: {
    code: 'PASSWORD_RECOVERY_NOT_REQUESTED_BY_USER',
    message: 'A recuperação de senha não foi solicitada pelo usuário',
  },
}

// ============= 403 Forbidden =============

export const USER_NOT_FOUND: IApiResponse = {
  status: StatusCodes.NOT_FOUND,
  body: {
    code: 'USER_NOT_FOUND',
    message: 'Usuário não encontrado',
  },
}

// ============= 409 Conflict =============

export const USER_ALREADY_EXISTS: IApiResponse = {
  status: StatusCodes.CONFLICT,
  body: {
    code: 'USER_ALREADY_EXISTS',
    message: 'O usuário já existe',
  },
}

export const USER_WITH_SAME_EMAIL: IApiResponse = {
  status: StatusCodes.CONFLICT,
  body: {
    code: 'USER_WITH_SAME_EMAIL',
    message: 'Já existe um usuário com o mesmo e-mail',
  },
}

export const USER_WITH_SAME_USERNAME: IApiResponse = {
  status: StatusCodes.CONFLICT,
  body: {
    code: 'USER_WITH_SAME_USERNAME',
    message: 'Já existe um usuário com o mesmo username',
  },
}

// ============= 413 Payload Too Large =============
