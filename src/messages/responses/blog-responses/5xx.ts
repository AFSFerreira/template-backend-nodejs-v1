import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 500 Internal Server Error =============

export const BLOG_BANNER_PERSIST_FAILED: IApiResponse = {
  status: 500,
  body: {
    code: 'BLOG_BANNER_PERSIST_FAILED',
    message: 'Falha ao persistir o banner do blog',
  },
}

export const BLOG_CONTENT_COPY_FAILED: IApiResponse = {
  status: 500,
  body: {
    code: 'BLOG_CONTENT_COPY_FAILED',
    message: 'Falha ao copiar o conteúdo do blog',
  },
}

export const BLOG_IMAGE_COPY_FAILED: IApiResponse = {
  status: 500,
  body: {
    code: 'BLOG_IMAGE_COPY_FAILED',
    message: 'Falha ao copiar uma das imagens do blog',
  },
}

export const BLOG_IMAGE_PERSIST_FAILED: IApiResponse = {
  status: 500,
  body: {
    code: 'BLOG_IMAGE_PERSIST_FAILED',
    message: 'Falha ao persistir uma ou mais imagens do blog',
  },
}
