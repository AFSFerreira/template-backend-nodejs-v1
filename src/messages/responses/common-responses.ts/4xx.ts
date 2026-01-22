import type { IApiResponse } from '@custom-types/responses/api-response'

export const BODY_REQUIRED: IApiResponse = {
  status: 400,
  body: {
    code: 'BODY_REQUIRED',
    message: 'O corpo da requisição está ausente',
  },
}

export const INVALID_PROSE_MIRROR_CONTENT: IApiResponse = {
  status: 400,
  body: {
    code: 'INVALID_PROSE_MIRROR_CONTENT',
    message: 'O conteúdo fornecido não é um Prose Mirror válido',
  },
}

export const INVALID_PROSE_MIRROR_IMAGE_LINK: IApiResponse = {
  status: 400,
  body: {
    code: 'INVALID_PROSE_MIRROR_IMAGE_LINK',
    message: 'Um ou mais links de imagem no conteúdo são inválidos',
  },
}

export const MISSING_MULTIPART_CONTENT_TYPE: IApiResponse = {
  status: 400,
  body: {
    code: 'MISSING_MULTIPART_CONTENT_TYPE',
    message: 'Content-Type inválido. Esperado multipart/form-data',
  },
}

export const MULTER_LIMIT_FIELD_COUNT: IApiResponse = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_FIELD_COUNT',
    message: 'Foram enviados mais campos do que o permitido',
  },
}

export const MULTER_LIMIT_FIELD_KEY: IApiResponse = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_FIELD_KEY',
    message: 'O nome de um campo enviado é muito longo',
  },
}

export const MULTER_LIMIT_FIELD_VALUE: IApiResponse = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_FIELD_VALUE',
    message: 'O valor de um campo enviado é muito longo',
  },
}

export const MULTER_LIMIT_FILE_COUNT: IApiResponse = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_FILE_COUNT',
    message: 'Foram enviados mais arquivos do que o permitido',
  },
}

export const MULTER_LIMIT_PART_COUNT: IApiResponse = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_PART_COUNT',
    message: 'O corpo da requisição contém partes demais',
  },
}

export const MULTER_LIMIT_UNEXPECTED_FILE: IApiResponse = {
  status: 400,
  body: {
    code: 'MULTER_LIMIT_UNEXPECTED_FILE',
    message: 'Um campo de arquivo inesperado foi enviado',
  },
}

export const MULTER_MISSING_FIELD_NAME: IApiResponse = {
  status: 400,
  body: {
    code: 'MULTER_MISSING_FIELD_NAME',
    message: 'Um dos arquivos enviados não possui nome de campo',
  },
}

export const SYNTAX_ERROR: IApiResponse = {
  status: 400,
  body: {
    code: 'SYNTAX_ERROR',
    message: 'Erro de sintaxe nos dados fornecidos',
  },
}

export const VALIDATION_ERROR: IApiResponse = {
  status: 400,
  body: {
    code: 'VALIDATION_ERROR',
    message: 'Erro de validação!',
  },
}

export const INVALID_BODY_FORMAT_JSON: IApiResponse = {
  status: 401,
  body: {
    code: 'INVALID_BODY_FORMAT_JSON',
    message: 'Formato inválido do JSON do corpo de requisição',
  },
}

export const MISSING_AUTHORIZATION_TOKEN: IApiResponse = {
  status: 401,
  body: {
    code: 'MISSING_AUTHORIZATION_TOKEN',
    message: 'Token de autorização ausente',
  },
}

export const MISSING_USER_INFO: IApiResponse = {
  status: 401,
  body: {
    code: 'MISSING_USER_INFO',
    message: 'Informações do usuário não encontradas na requisição',
  },
}

export const UNAUTHORIZED: IApiResponse = {
  status: 401,
  body: {
    code: 'UNAUTHORIZED',
    message: 'Usuário não autenticado',
  },
}

export const FORBIDDEN: IApiResponse = {
  status: 403,
  body: {
    code: 'FORBIDDEN',
    message: 'Usuário não tem permissão para usar este recurso',
  },
}

export const RESOURCE_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'RESOURCE_NOT_FOUND',
    message: 'Recurso não encontrado',
  },
}

export const MAX_MULTIPART_FILE_SIZE_LIMIT: IApiResponse = {
  status: 413,
  body: {
    code: 'MAX_MULTIPART_FILE_SIZE_LIMIT',
    message: 'O arquivo excede o tamanho limite permitido',
  },
}

export const MULTER_LIMIT_FILE_SIZE: IApiResponse = {
  status: 413,
  body: {
    code: 'MULTER_LIMIT_FILE_SIZE',
    message: 'O arquivo enviado excede o tamanho máximo permitido',
  },
}

export const TOO_MANY_REQUESTS: IApiResponse = {
  status: 429,
  body: {
    code: 'TOO_MANY_REQUESTS',
    message: 'Você excedeu o limite de requisições Por favor, tente novamente mais tarde',
  },
}
