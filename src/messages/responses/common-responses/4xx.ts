import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 400 Bad Request =============

export const BODY_REQUIRED: IApiResponse = {
  status: 400,
  body: {
    code: 'BODY_REQUIRED',
    message: 'O corpo da requisição está ausente',
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

// ============= 401 Unauthorized =============

export const INVALID_BODY_FORMAT_JSON: IApiResponse = {
  status: 401,
  body: {
    code: 'INVALID_BODY_FORMAT_JSON',
    message: 'Formato inválido do JSON do corpo de requisição',
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

// ============= 403 Forbidden =============

export const FORBIDDEN: IApiResponse = {
  status: 403,
  body: {
    code: 'FORBIDDEN',
    message: 'Usuário não tem permissão para usar este recurso',
  },
}

// ============= 404 Not Found =============

export const RESOURCE_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'RESOURCE_NOT_FOUND',
    message: 'Recurso não encontrado',
  },
}

// ============= 413 Payload Too Large =============

export const MAX_MULTIPART_FILE_SIZE_LIMIT: IApiResponse = {
  status: 413,
  body: {
    code: 'MAX_MULTIPART_FILE_SIZE_LIMIT',
    message: 'O arquivo excede o tamanho limite permitido',
  },
}

export const TOO_MANY_REQUESTS: IApiResponse = {
  status: 429,
  body: {
    code: 'TOO_MANY_REQUESTS',
    message: 'Você excedeu o limite de requisições Por favor, tente novamente mais tarde',
  },
}
