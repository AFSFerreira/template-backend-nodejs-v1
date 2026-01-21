import type { IApiError } from '@custom-types/errors/api-error'

export const NEWSLETTER_HTML_PERSIST_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'NEWSLETTER_HTML_PERSIST_ERROR',
    message: 'Erro ao persistir o arquivo HTML da newsletter',
  },
}

export const NEWSLETTER_HTML_READ_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'NEWSLETTER_HTML_READ_ERROR',
    message: 'Erro ao recuperar o arquivo HTML da newsletter',
  },
}
