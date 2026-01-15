import type { IApiError } from '@custom-types/errors/api-error'

export const NEWSLETTER_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'NEWSLETTER_NOT_FOUND',
    message: 'A newsletter solicitada não foi encontrada',
  },
}

export const FILE_TOO_BIG: IApiError = {
  status: 413,
  body: {
    code: 'FILE_TOO_BIG',
    message: 'O arquivo enviado é muito grande',
  },
}

export const NEWSLETTER_HTML_READ_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'NEWSLETTER_HTML_READ_ERROR',
    message: 'Erro ao recuperar o arquivo HTML da newsletter',
  },
}

export const NEWSLETTER_ALREADY_EXISTS: IApiError = {
  status: 409,
  body: {
    code: 'NEWSLETTER_ALREADY_EXISTS',
    message: 'Já existe uma newsletter com esse volume e número de edição',
  },
}

export const NEWSLETTER_HTML_PERSIST_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'NEWSLETTER_HTML_PERSIST_ERROR',
    message: 'Erro ao persistir o arquivo HTML da newsletter',
  },
}
