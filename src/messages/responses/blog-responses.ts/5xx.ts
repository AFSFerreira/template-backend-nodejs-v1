import type { IApiError } from '@custom-types/errors/api-error'

export const BLOG_BANNER_PERSIST_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'BLOG_BANNER_PERSIST_FAILED',
    message: 'Falha ao persistir o banner do blog',
  },
}

export const BLOG_CONTENT_COPY_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'BLOG_CONTENT_COPY_FAILED',
    message: 'Falha ao copiar o conteúdo do blog',
  },
}

export const BLOG_IMAGE_COPY_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'BLOG_IMAGE_COPY_FAILED',
    message: 'Falha ao copiar uma das imagens do blog',
  },
}

export const BLOG_IMAGE_PERSIST_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'BLOG_IMAGE_PERSIST_FAILED',
    message: 'Falha ao persistir uma ou mais imagens do blog',
  },
}
