import type { IApiError } from '@custom-types/errors/api-error'

export const MISSING_AUTHORIZATION_TOKEN: IApiError = {
  status: 401,
  body: {
    code: 'MISSING_AUTHORIZATION_TOKEN',
    message: 'Token de autorização ausente',
  },
}

export const RESOURCE_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'RESOURCE_NOT_FOUND',
    message: 'Recurso não encontrado',
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

export const SYNTAX_ERROR: IApiError = {
  status: 400,
  body: {
    code: 'SYNTAX_ERROR',
    message: 'Erro de sintaxe nos dados fornecidos',
  },
}

export const INVALID_BODY_FORMAT_JSON: IApiError = {
  status: 401,
  body: {
    code: 'INVALID_BODY_FORMAT_JSON',
    message: 'Formato inválido do JSON do corpo de requisição',
  },
}

export const MISSING_MULTIPART_CONTENT_TYPE: IApiError = {
  status: 400,
  body: {
    code: 'MISSING_MULTIPART_CONTENT_TYPE',
    message: 'Content-Type inválido. Esperado multipart/form-data',
  },
}

export const MAX_MULTIPART_FILE_SIZE_LIMIT: IApiError = {
  status: 413,
  body: {
    code: 'MAX_MULTIPART_FILE_SIZE_LIMIT',
    message: 'O arquivo excede o tamanho limite permitido',
  },
}

// Multer-related responses
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

export const MISSING_USER_INFO: IApiError = {
  status: 401,
  body: {
    code: 'MISSING_USER_INFO',
    message: 'Informações do usuário não encontradas na requisição',
  },
}

export const INVALID_PROSE_MIRROR_IMAGE_LINK: IApiError = {
  status: 400,
  body: {
    code: 'INVALID_PROSE_MIRROR_IMAGE_LINK',
    message: 'Um ou mais links de imagem no conteúdo são inválidos',
  },
}

export const INVALID_PROSE_MIRROR_CONTENT: IApiError = {
  status: 400,
  body: {
    code: 'INVALID_PROSE_MIRROR_CONTENT',
    message: 'O conteúdo fornecido não é um Prose Mirror válido',
  },
}
