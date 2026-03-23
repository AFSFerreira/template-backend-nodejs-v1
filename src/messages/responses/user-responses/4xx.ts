import type { IApiResponse } from '@custom-types/responses/api-response'
import { MAX_USER_PROFILE_IMAGE_FILE_SIZE_BYTES, MB_IN_BYTES } from '@constants/size-constants'
import { allowedImageMimeTypes } from '@constants/static-file-constants'
import { StatusCodes } from 'http-status-codes'

// ============= 400 Bad Request =============

export const CANNOT_TRANSFER_ADMIN_TO_SELF: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'CANNOT_TRANSFER_ADMIN_TO_SELF',
    message: 'Não é possível transferir a role de administrador para si mesmo',
  },
}

export const EMAIL_CHANGE_NOT_REQUESTED: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'EMAIL_CHANGE_NOT_REQUESTED',
    message: 'Não há solicitação de alteração de e-mail pendente para este usuário',
  },
}

export const EMAIL_VERIFICATION_NOT_REQUESTED: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'EMAIL_VERIFICATION_NOT_REQUESTED',
    message: 'Verificação de e-mail não foi solicitada para este usuário',
  },
}

export const EMAILS_DO_NOT_MATCH: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'EMAILS_DO_NOT_MATCH',
    message: 'O e-mail antigo fornecido não corresponde ao e-mail atual da conta',
  },
}

export const IDENTITY_INFO_MISSING: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'IDENTITY_INFO_MISSING',
    message: 'Você deve fornecer simultaneamente um tipo de documento e um valor de documento',
  },
}

export const INVALID_AREA_OF_ACTIVITY: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'INVALID_AREA_OF_ACTIVITY',
    message: 'Área de atuação inválida',
  },
}

export const INVALID_EMAIL_DOMAIN: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'INVALID_EMAIL_DOMAIN',
    message: 'O domínio do e-mail fornecido é inválido ou não possui registros MX válidos',
  },
}

export const INVALID_SECONDARY_EMAIL_DOMAIN: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'INVALID_SECONDARY_EMAIL_DOMAIN',
    message: 'O domínio do e-mail secundário fornecido é inválido ou não possui registros MX válidos',
  },
}

export const MISSING_CHECK_AVAILABILITIES_INPUT: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'MISSING_CHECK_AVAILABILITIES_INPUT',
    message: 'Propriedades de entrada ausentes Forneça pelo menos uma delas',
  },
}

export const CANNOT_UPDATE_MEMBERSHIP_STATUS_VERIFYING_OR_PENDING: IApiResponse = {
  status: StatusCodes.BAD_REQUEST,
  body: {
    code: 'CANNOT_UPDATE_MEMBERSHIP_STATUS_VERIFYING_OR_PENDING',
    message: 'Não é possível atualizar o status de membro de usuários com status VERIFYING ou PENDING',
  },
}

// ============= 401 Unauthorized =============

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

export const INVALID_IMAGE_FORMAT: IApiResponse = {
  status: StatusCodes.UNAUTHORIZED,
  body: {
    code: 'INVALID_IMAGE_FORMAT',
    message: `Apenas arquivos com formato de imagem são válidos: ${allowedImageMimeTypes.join(', ')}`,
  },
}

export const INVALID_OR_EXPIRED_TOKEN: IApiResponse = {
  status: StatusCodes.UNAUTHORIZED,
  body: {
    code: 'INVALID_OR_EXPIRED_TOKEN',
    message: 'Token inválido ou expirado',
  },
}

export const MEMBERSHIP_STATUS_NOT_PENDING: IApiResponse = {
  status: StatusCodes.UNAUTHORIZED,
  body: {
    code: 'MEMBERSHIP_STATUS_NOT_PENDING',
    message: 'O status de membro do usuário não está pendente',
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

export const CURRENT_USER_IS_NOT_ADMIN: IApiResponse = {
  status: StatusCodes.FORBIDDEN,
  body: {
    code: 'CURRENT_USER_IS_NOT_ADMIN',
    message: 'O usuário atual não possui a role de administrador',
  },
}

export const ADMIN_CANNOT_BE_INACTIVATED: IApiResponse = {
  status: StatusCodes.FORBIDDEN,
  body: {
    code: 'ADMIN_CANNOT_BE_INACTIVATED',
    message: 'O status de membro de administradores não pode ser inativado',
  },
}

export const ADMIN_CANNOT_DEACTIVATE_SELF: IApiResponse = {
  status: StatusCodes.FORBIDDEN,
  body: {
    code: 'ADMIN_CANNOT_DEACTIVATE_SELF',
    message: 'Administradores não podem inativar a si mesmos',
  },
}

export const ADMIN_CANNOT_DELETE_SELF: IApiResponse = {
  status: StatusCodes.FORBIDDEN,
  body: {
    code: 'ADMIN_CANNOT_DELETE_SELF',
    message: 'Administradores não podem deletar a si mesmos',
  },
}

export const ADMIN_CANNOT_UPDATE_OWN_ROLE: IApiResponse = {
  status: StatusCodes.FORBIDDEN,
  body: {
    code: 'ADMIN_CANNOT_UPDATE_OWN_ROLE',
    message:
      'Administradores não podem atualizar sua própria permissão. Transfira a permissão de administrador para outro membro primeiro',
  },
}

export const INACTIVE_USER: IApiResponse = {
  status: StatusCodes.FORBIDDEN,
  body: {
    code: 'INACTIVE_USER',
    message: 'Usuário atualmente inativo',
  },
}

export const PENDING_USER: IApiResponse = {
  status: StatusCodes.FORBIDDEN,
  body: {
    code: 'PENDING_USER',
    message: 'O pedido de cadastro ainda está aguardando aprovação da equipe de moderação',
  },
}

export const UNVERIFIED_EMAIL: IApiResponse = {
  status: StatusCodes.FORBIDDEN,
  body: {
    code: 'UNVERIFIED_EMAIL',
    message: 'E-mail ainda não verificado. Por favor, verifique sua caixa de entrada e confirme seu e-mail',
  },
}

// ============= 404 Not Found =============

export const USER_NOT_FOUND: IApiResponse = {
  status: StatusCodes.NOT_FOUND,
  body: {
    code: 'USER_NOT_FOUND',
    message: 'Usuário não encontrado',
  },
}

// ============= 409 Conflict =============

export const ADMIN_ROLE_ALREADY_ASSIGNED: IApiResponse = {
  status: StatusCodes.CONFLICT,
  body: {
    code: 'ADMIN_ROLE_ALREADY_ASSIGNED',
    message: 'Já existe um administrador no sistema',
  },
}

export const IDENTITY_DOCUMENT_ALREADY_USED: IApiResponse = {
  status: StatusCodes.CONFLICT,
  body: {
    code: 'IDENTITY_DOCUMENT_ALREADY_USED',
    message: 'Documento de identidade já utilizado',
  },
}

export const USER_ALREADY_EXISTS: IApiResponse = {
  status: StatusCodes.CONFLICT,
  body: {
    code: 'USER_ALREADY_EXISTS',
    message: 'O usuário já existe',
  },
}

export const USER_ALREADY_HAS_ADDRESS: IApiResponse = {
  status: StatusCodes.CONFLICT,
  body: {
    code: 'USER_ALREADY_HAS_ADDRESS',
    message: 'O usuário já possui um endereço',
  },
}

export const USER_WITH_SAME_EMAIL: IApiResponse = {
  status: StatusCodes.CONFLICT,
  body: {
    code: 'USER_WITH_SAME_EMAIL',
    message: 'Já existe um usuário com o mesmo e-mail',
  },
}

export const USER_WITH_SAME_IDENTITY_DOCUMENT: IApiResponse = {
  status: StatusCodes.CONFLICT,
  body: {
    code: 'USER_WITH_SAME_IDENTITY_DOCUMENT',
    message: 'Já existe um usuário com o mesmo documento de identificação',
  },
}

export const USER_WITH_SAME_SECONDARY_EMAIL: IApiResponse = {
  status: StatusCodes.CONFLICT,
  body: {
    code: 'USER_WITH_SAME_SECONDARY_EMAIL',
    message: 'Já existe um usuário com o mesmo e-mail secundário',
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

export const IMAGE_TOO_BIG: IApiResponse = {
  status: StatusCodes.REQUEST_TOO_LONG,
  body: {
    code: 'IMAGE_TOO_BIG',
    message: `O arquivo de imagem é muito grande! Forneça uma imagem de no máximo ${Math.floor(MAX_USER_PROFILE_IMAGE_FILE_SIZE_BYTES / MB_IN_BYTES)}mb`,
  },
}
