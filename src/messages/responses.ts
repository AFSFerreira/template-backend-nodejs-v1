import { MAX_IMAGE_FILE_SIZE_BYTES } from '@constants/file-constants'
import type { IApiError } from '@custom-types/custom/api-error-type'

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

export const MISSING_AUTHORIZATION_TOKEN: IApiError = {
  status: 401,
  body: {
    code: 'MISSING_AUTHORIZATION_TOKEN',
    message: 'Token de autorização ausente',
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

export const RESOURCE_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'RESOURCE_NOT_FOUND',
    message: 'Recurso não encontrado',
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

export const FORBIDDEN: IApiError = {
  status: 403,
  body: {
    code: 'FORBIDDEN',
    message: 'Usuário não tem permissão para usar este recurso',
  },
}

export const UNAUTHORIZED: IApiError = {
  status: 401,
  body: {
    code: 'UNAUTHORIZED',
    message: 'Usuário não autenticado',
  },
}

export const BODY_REQUIRED: IApiError = {
  status: 400,
  body: {
    code: 'BODY_REQUIRED',
    message: 'O corpo da requisição está ausente',
  },
}

export const INVALID_INSTITUTION_NAME: IApiError = {
  status: 400,
  body: {
    code: 'INVALID_INSTITUTION_NAME',
    message: 'Nome da instituição inválido',
  },
}

export const MISSING_CHECK_AVAILABILITIES_INPUT: IApiError = {
  status: 400,
  body: {
    code: 'MISSING_CHECK_AVAILABILITIES_INPUT',
    message: 'Propriedades de entrada ausentes Forneça pelo menos uma delas',
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

export const IMAGE_TOO_BIG: IApiError = {
  status: 413,
  body: {
    code: 'IMAGE_TOO_BIG',
    message: `O arquivo de imagem é muito grande! Forneça uma imagem de no máximo ${MAX_IMAGE_FILE_SIZE_BYTES}mb`,
  },
}

export const TOO_MANY_REQUESTS: IApiError = {
  status: 429,
  body: {
    code: 'TOO_MANY_REQUESTS',
    message: 'Você excedeu o limite de requisições Por favor, tente novamente mais tarde',
  },
}

export const VALIDATION_ERROR: IApiError = {
  status: 400,
  body: {
    code: 'VALIDATION_ERROR',
    message: 'Erro de validação!',
  },
}

export const INTERNAL_SERVER_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Erro interno no servidor',
  },
}

export const ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR',
    message: 'Erro ao iniciar o local storage da requisição',
  },
}

export const SYNTAX_ERROR: IApiError = {
  status: 400,
  body: {
    code: 'SYNTAX_ERROR',
    message: 'Erro de sintaxe nos dados fornecidos',
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

export const BLOG_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'BLOG_NOT_FOUND',
    message: 'O blog solicitado não foi encontrado',
  },
}

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

export const RETRIEVE_INSTITUTIONS_ERROR: IApiError = {
  status: 503,
  body: {
    code: 'RETRIEVE_INSTITUTIONS_ERROR',
    message: 'Falha ao tentar recuperar as informações das universidades',
  },
}

export const MULTER_LIMIT_FILE_SIZE: IApiError = {
  status: 413,
  body: {
    code: 'MULTER_LIMIT_FILE_SIZE',
    message: 'O arquivo enviado excede o tamanho máximo permitido',
  },
}

export const MULTER_LIMIT_FILE_COUNT: IApiError = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_FILE_COUNT',
    message: 'Foram enviados mais arquivos do que o permitido',
  },
}

export const MULTER_LIMIT_FIELD_KEY: IApiError = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_FIELD_KEY',
    message: 'O nome de um campo enviado é muito longo',
  },
}

export const MULTER_LIMIT_FIELD_VALUE: IApiError = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_FIELD_VALUE',
    message: 'O valor de um campo enviado é muito longo',
  },
}

export const MULTER_LIMIT_FIELD_COUNT: IApiError = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_FIELD_COUNT',
    message: 'Foram enviados mais campos do que o permitido',
  },
}

export const MULTER_LIMIT_UNEXPECTED_FILE: IApiError = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_UNEXPECTED_FILE',
    message: 'Um campo de arquivo inesperado foi enviado',
  },
}

export const MULTER_LIMIT_PART_COUNT: IApiError = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_PART_COUNT',
    message: 'O corpo da requisição contém partes demais',
  },
}

export const MULTER_MISSING_FIELD_NAME: IApiError = {
  status: 400,
  body: {
    code: 'MULTER_MISSING_FIELD_NAME',
    message: 'Um dos arquivos enviados não possui nome de campo',
  },
}

export const MULTER_UNKNOWN_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'MULTER_UNKNOWN_ERROR',
    message: 'Ocorreu um erro desconhecido durante o upload do arquivo',
  },
}

export const INVALID_BODY_FORMAT_JSON: IApiError = {
  status: 401,
  body: {
    code: 'INVALID_BODY_FORMAT_JSON',
    message: 'Formato inválido do JSON do corpo de requisição',
  },
}
