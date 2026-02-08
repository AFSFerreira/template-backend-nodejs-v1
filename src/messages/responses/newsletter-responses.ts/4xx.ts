import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 404 Not Found =============

export const NEWSLETTER_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'NEWSLETTER_NOT_FOUND',
    message: 'A newsletter solicitada não foi encontrada',
  },
}

// ============= 409 Conflict =============

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
