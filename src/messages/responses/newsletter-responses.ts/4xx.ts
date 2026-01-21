import type { IApiError } from '@custom-types/errors/api-error'

export const NEWSLETTER_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'NEWSLETTER_NOT_FOUND',
    message: 'A newsletter solicitada não foi encontrada',
  },
}

export const NEWSLETTER_ALREADY_EXISTS: IApiError = {
  status: 409,
  body: {
    code: 'NEWSLETTER_ALREADY_EXISTS',
    message: 'Já existe uma newsletter com esse volume e número de edição',
  },
}

export const FILE_TOO_BIG: IApiError = {
  status: 413,
  body: {
    code: 'FILE_TOO_BIG',
    message: 'O arquivo enviado é muito grande',
  },
}
