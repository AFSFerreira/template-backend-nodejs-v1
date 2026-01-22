import type { IApiResponse } from '@custom-types/responses/api-response'

export const PASSWORD_RESET_IF_USER_EXISTS: IApiResponse = {
  status: 200,
  body: {
    code: 'PASSWORD_RESET_IF_USER_EXISTS',
    message: 'Se o usuário existir, você receberá um e-mail com instruções para redefinir a senha',
  },
}

export const LOGOUT: IApiResponse = {
  status: 200,
  body: {
    code: 'SUCCESSFUL_LOGOUT',
    message: 'Logout bem sucedido!',
  },
}

export const PASSWORD_RESET_SUCCESSFUL: IApiResponse = {
  status: 200,
  body: {
    code: 'PASSWORD_RESET_SUCCESSFUL',
    message: 'Senha redefinida com sucesso!',
  },
}

export const EMAIL_VERIFICATION_SUCCESSFUL: IApiResponse = {
  status: 200,
  body: {
    code: 'EMAIL_VERIFICATION_SUCCESSFUL',
    message: 'E-mail verificado com sucesso! Seu cadastro será avaliado pela equipe de moderação.',
  },
}

export const NO_USERS_AVAILABLE: IApiResponse = {
  status: 204,
  body: {
    code: 'NO_USERS_AVAILABLE',
    message: 'Nenhuma informação de usuários disponível para exportação',
  },
}
