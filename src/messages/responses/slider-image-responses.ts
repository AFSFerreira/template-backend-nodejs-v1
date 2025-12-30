import type { IApiError } from '@custom-types/custom/api-error-type'
import { MAX_SLIDER_IMAGES_QUANTITY } from '@constants/static-file-constants'

export const HOME_PAGE_SLIDER_IMAGE_PERSIST_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'HOME_PAGE_SLIDER_IMAGE_PERSIST_FAILED',
    message: 'Falha ao persistir a imagem do slider da página inicial',
  },
}

export const SLIDER_IMAGE_LIMIT_REACHED: IApiError = {
  status: 409,
  body: {
    code: 'SLIDER_IMAGE_LIMIT_REACHED',
    message: `Limite de ${MAX_SLIDER_IMAGES_QUANTITY} imagens de slider atingido. Remova uma imagem antes de adicionar outra.`,
  },
}

export const SLIDER_IMAGE_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'SLIDER_IMAGE_NOT_FOUND',
    message: 'A imagem de slider solicitada não foi encontrada',
  },
}

export const SLIDER_IMAGE_INVALID_ORDER: IApiError = {
  status: 400,
  body: {
    code: 'SLIDER_IMAGE_INVALID_ORDER',
    message: 'O valor de ordem informado para a imagem de slider é inválido',
  },
}
