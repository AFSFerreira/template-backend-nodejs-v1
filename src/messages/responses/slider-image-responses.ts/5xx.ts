import type { IApiResponse } from '@custom-types/responses/api-response'

export const HOME_PAGE_SLIDER_IMAGE_PERSIST_FAILED: IApiResponse = {
  status: 500,
  body: {
    code: 'HOME_PAGE_SLIDER_IMAGE_PERSIST_FAILED',
    message: 'Falha ao persistir a imagem do slider da página inicial',
  },
}
