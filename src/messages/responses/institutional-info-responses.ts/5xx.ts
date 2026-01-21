import type { IApiError } from '@custom-types/errors/api-error'

export const INSTITUTIONAL_INFO_IMAGE_STORAGE_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'INSTITUTIONAL_INFO_IMAGE_STORAGE_ERROR',
    message: 'Erro ao armazenar a imagem institucional',
  },
}
