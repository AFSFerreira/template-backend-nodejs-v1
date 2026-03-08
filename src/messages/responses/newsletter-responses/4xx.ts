import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 400 Bad Request =============

export const INVALID_NEWSLETTER_CONTENT: IApiResponse = {
  status: 400,
  body: {
    code: 'INVALID_NEWSLETTER_CONTENT',
    message: 'O conteúdo da newsletter é inválido',
  },
}

export const NEWSLETTER_INVALID_IMAGE_LINK: IApiResponse = {
  status: 400,
  body: {
    code: 'NEWSLETTER_INVALID_IMAGE_LINK',
    message: 'O link de imagem da newsletter é inválido',
  },
}

export const NEWSLETTER_INVALID_FILENAME: IApiResponse = {
  status: 400,
  body: {
    code: 'NEWSLETTER_INVALID_FILENAME',
    message: 'O nome do arquivo da newsletter é inválido',
  },
}

// ============= 404 Not Found =============

export const NEWSLETTER_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'NEWSLETTER_NOT_FOUND',
    message: 'A newsletter solicitada não foi encontrada',
  },
}

export const NEWSLETTER_TEMPLATE_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'NEWSLETTER_TEMPLATE_NOT_FOUND',
    message: 'O template de newsletter solicitado não foi encontrado',
  },
}

// ============= 409 Conflict =============

export const NEWSLETTER_TEMPLATE_NOT_CONFIGURED: IApiResponse = {
  status: 409,
  body: {
    code: 'NEWSLETTER_TEMPLATE_NOT_CONFIGURED',
    message: 'A newsletter não possui um template configurado',
  },
}

export const NEWSLETTER_ALREADY_EXISTS: IApiResponse = {
  status: 409,
  body: {
    code: 'NEWSLETTER_ALREADY_EXISTS',
    message: 'Já existe uma newsletter com esse volume e número de edição',
  },
}

// ============= 413 Payload Too Large =============

export const FILE_TOO_BIG: IApiResponse = {
  status: 413,
  body: {
    code: 'FILE_TOO_BIG',
    message: 'O arquivo enviado é muito grande',
  },
}
