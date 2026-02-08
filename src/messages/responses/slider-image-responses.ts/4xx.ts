import type { IApiResponse } from '@custom-types/responses/api-response'
import { MAX_SLIDER_IMAGES_QUANTITY } from '@constants/static-file-constants'

// ============= 400 Bad Request =============

export const SLIDER_IMAGE_INVALID_ORDER: IApiResponse = {
  status: 400,
  body: {
    code: 'SLIDER_IMAGE_INVALID_ORDER',
    message: 'O valor de ordem informado para a imagem de slider é inválido',
  },
}

// ============= 404 Not Found =============

export const SLIDER_IMAGE_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'SLIDER_IMAGE_NOT_FOUND',
    message: 'A imagem de slider solicitada não foi encontrada',
  },
}

// ============= 409 Conflict =============

export const SLIDER_IMAGE_LIMIT_REACHED: IApiResponse = {
  status: 409,
  body: {
    code: 'SLIDER_IMAGE_LIMIT_REACHED',
    message: `Limite de ${MAX_SLIDER_IMAGES_QUANTITY} imagens de slider atingido. Remova uma imagem antes de adicionar outra.`,
  },
}
