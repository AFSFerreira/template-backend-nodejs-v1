import type { IApiError } from '@custom-types/errors/api-error'

export const HOME_PAGE_SLIDER_IMAGE_PERSIST_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'HOME_PAGE_SLIDER_IMAGE_PERSIST_FAILED',
    message: 'Falha ao persistir a imagem do slider da página inicial',
  },
}
