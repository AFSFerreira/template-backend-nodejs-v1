import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 500 Internal Server Error =============

export const INSTITUTIONAL_INFO_IMAGE_STORAGE_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'INSTITUTIONAL_INFO_IMAGE_STORAGE_ERROR',
    message: 'Erro ao armazenar a imagem institucional',
  },
}
