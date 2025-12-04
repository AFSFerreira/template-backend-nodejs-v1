import { allowedImageMimeTypes, MAX_IMAGE_FILE_SIZE_BYTES } from '@constants/file-constants'
import type { IApiError } from '@custom-types/custom/api-error-type'

// User-related responses
export const NO_USERS_AVAILABLE: IApiError = {
  status: 204,
  body: {
    code: 'NO_USERS_AVAILABLE',
    message: 'Nenhuma informação de usuários disponível para exportação',
  },
}

export const INVALID_CREDENTIALS: IApiError = {
  status: 401,
  body: {
    code: 'INVALID_CREDENTIALS',
    message: 'Credenciais inválidas',
  },
}

export const USER_ALREADY_EXISTS: IApiError = {
  status: 409,
  body: {
    code: 'USER_ALREADY_EXISTS',
    message: 'O usuário já existe',
  },
}

export const USER_ALREADY_HAS_ADDRESS: IApiError = {
  status: 409,
  body: {
    code: 'USER_ALREADY_HAS_ADDRESS',
    message: 'O usuário já possui um endereço',
  },
}

export const USER_IMAGE_PROCESSING_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'USER_IMAGE_PROCESSING_ERROR',
    message: 'Erro ao tentar processar a foto de perfil do usuário',
  },
}

export const USER_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'USER_NOT_FOUND',
    message: 'Usuário não encontrado',
  },
}

export const PASSWORD_RESET_IF_USER_EXISTS: IApiError = {
  status: 200,
  body: {
    code: 'PASSWORD_RESET_IF_USER_EXISTS',
    message: 'Se o usuário existir, você receberá um e-mail com instruções para redefinir a senha',
  },
}

export const USER_WITH_SAME_EMAIL: IApiError = {
  status: 409,
  body: {
    code: 'USER_WITH_SAME_EMAIL',
    message: 'Já existe um usuário com o mesmo e-mail',
  },
}

export const USER_WITH_SAME_USERNAME: IApiError = {
  status: 409,
  body: {
    code: 'USER_WITH_SAME_USERNAME',
    message: 'Já existe um usuário com o mesmo username',
  },
}

export const USER_WITH_SAME_IDENTITY_DOCUMENT: IApiError = {
  status: 409,
  body: {
    code: 'USER_WITH_SAME_IDENTITY_DOCUMENT',
    message: 'Já existe um usuário com o mesmo documento de identificação',
  },
}

export const IDENTITY_DOCUMENT_ALREADY_USED: IApiError = {
  status: 409,
  body: {
    code: 'IDENTITY_DOCUMENT_ALREADY_USED',
    message: 'Documento de identidade já utilizado',
  },
}

export const INACTIVE_USER: IApiError = {
  status: 403,
  body: {
    code: 'INACTIVE_USER',
    message: 'Usuário atualmente inativo',
  },
}

export const PENDING_USER: IApiError = {
  status: 403,
  body: {
    code: 'PENDING_USER',
    message: 'O pedido de cadastro ainda está aguardando aprovação da equipe de moderação',
  },
}

export const IDENTITY_INFO_MISSING: IApiError = {
  status: 400,
  body: {
    code: 'IDENTITY_INFO_MISSING',
    message: 'Você deve fornecer simultaneamente um tipo de documento e um valor de documento',
  },
}

export const MISSING_CHECK_AVAILABILITIES_INPUT: IApiError = {
  status: 400,
  body: {
    code: 'MISSING_CHECK_AVAILABILITIES_INPUT',
    message: 'Propriedades de entrada ausentes Forneça pelo menos uma delas',
  },
}

export const INVALID_AREA_OF_ACTIVITY: IApiError = {
  status: 400,
  body: {
    code: 'INVALID_AREA_OF_ACTIVITY',
    message: 'Área de atuação inválida',
  },
}

export const INVALID_OR_EXPIRED_TOKEN: IApiError = {
  status: 401,
  body: {
    code: 'INVALID_OR_EXPIRED_TOKEN',
    message: 'Token inválido ou expirado',
  },
}

export const IMAGE_TOO_BIG: IApiError = {
  status: 413,
  body: {
    code: 'IMAGE_TOO_BIG',
    message: `O arquivo de imagem é muito grande! Forneça uma imagem de no máximo ${MAX_IMAGE_FILE_SIZE_BYTES}mb`,
  },
}

export const LOGOUT: IApiError = {
  status: 200,
  body: {
    code: 'SUCCESSFUL_LOGOUT',
    message: 'Logout bem sucedido!',
  },
}

export const PASSWORD_RESET_SUCCESSFUL: IApiError = {
  status: 200,
  body: {
    code: 'PASSWORD_RESET_SUCCESSFUL',
    message: 'Senha redefinida com sucesso!',
  },
}

export const INVALID_IMAGE_FORMAT: IApiError = {
  status: 401,
  body: {
    code: 'INVALID_IMAGE_FORMAT',
    message: `Apenas arquivos com formato de imagem são válidos: ${allowedImageMimeTypes.reduce((prev, curr) => prev + ', ' + curr, '')}`,
  },
}

export const MEMBERSHIP_STATUS_NOT_PENDING: IApiError = {
  status: 401,
  body: {
    code: 'MEMBERSHIP_STATUS_NOT_PENDING',
    message: 'O status de membro do usuário não está pendente',
  },
}
