import type { IApiError } from '@custom-types/errors/api-error'

export const DIRECTOR_BOARD_IMAGE_STORAGE_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'DIRECTOR_BOARD_IMAGE_STORAGE_ERROR',
    message: 'Erro ao armazenar a imagem de perfil do membro do corpo diretivo',
  },
}

export const DIRECTOR_BOARD_LIST_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'DIRECTOR_BOARD_LIST_ERROR',
    message: 'Erro ao processar a lista de membros do corpo diretivo',
  },
}
