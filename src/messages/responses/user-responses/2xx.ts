import type { IApiResponse } from '@custom-types/responses/api-response'
import { StatusCodes } from 'http-status-codes'

// ============= 200 OK =============

export const EMAIL_CHANGE_REQUESTED: IApiResponse = {
  status: StatusCodes.OK,
  body: {
    code: 'EMAIL_CHANGE_REQUESTED',
    message: 'Solicitação de alteração de e-mail enviada! Verifique o novo e-mail para confirmar a alteração.',
  },
}

export const EMAIL_UPDATED_SUCCESSFULLY: IApiResponse = {
  status: StatusCodes.OK,
  body: {
    code: 'EMAIL_UPDATED_SUCCESSFULLY',
    message: 'E-mail atualizado com sucesso!',
  },
}

export const EMAIL_VERIFICATION_SUCCESSFUL: IApiResponse = {
  status: StatusCodes.OK,
  body: {
    code: 'EMAIL_VERIFICATION_SUCCESSFUL',
    message: 'E-mail verificado com sucesso! Seu cadastro será avaliado pela equipe de moderação.',
  },
}

export const LOGOUT: IApiResponse = {
  status: StatusCodes.OK,
  body: {
    code: 'SUCCESSFUL_LOGOUT',
    message: 'Logout bem sucedido!',
  },
}

export const PASSWORD_RESET_IF_USER_EXISTS: IApiResponse = {
  status: StatusCodes.OK,
  body: {
    code: 'PASSWORD_RESET_IF_USER_EXISTS',
    message: 'Se o usuário existir, você receberá um e-mail com instruções para redefinir a senha',
  },
}

export const PASSWORD_RESET_SUCCESSFUL: IApiResponse = {
  status: StatusCodes.OK,
  body: {
    code: 'PASSWORD_RESET_SUCCESSFUL',
    message: 'Senha redefinida com sucesso!',
  },
}

export const PASSWORD_UPDATED_SUCCESSFULLY: IApiResponse = {
  status: StatusCodes.OK,
  body: {
    code: 'PASSWORD_UPDATED_SUCCESSFULLY',
    message: 'Senha atualizada com sucesso!',
  },
}

// ============= 204 No Content =============

export const NO_USERS_AVAILABLE: IApiResponse = {
  status: StatusCodes.NO_CONTENT,
  body: {
    code: 'NO_USERS_AVAILABLE',
    message: 'Nenhuma informação de usuários disponível para exportação',
  },
}
