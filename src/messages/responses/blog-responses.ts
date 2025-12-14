import type { IApiError } from '@custom-types/custom/api-error-type'

// Blog-related responses
export const BLOG_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'BLOG_NOT_FOUND',
    message: 'O blog solicitado não foi encontrado',
  },
}

export const INVALID_BLOG_CONTENT: IApiError = {
  status: 400,
  body: {
    code: 'INVALID_BLOG_CONTENT',
    message: 'O conteúdo do blog é inválido',
  },
}

export const BLOG_BANNER_PERSIST_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'BLOG_BANNER_PERSIST_FAILED',
    message: 'Falha ao persistir o banner do blog',
  },
}

export const BLOG_IMAGE_PERSIST_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'BLOG_IMAGE_PERSIST_FAILED',
    message: 'Falha ao persistir uma ou mais imagens do blog',
  },
}
