import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 500 Internal Server Error =============

export const DIRECTOR_BOARD_IMAGE_STORAGE_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'DIRECTOR_BOARD_IMAGE_STORAGE_ERROR',
    message: 'Erro ao armazenar a imagem de perfil do membro do corpo diretivo',
  },
}

export const DIRECTOR_BOARD_LIST_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'DIRECTOR_BOARD_LIST_ERROR',
    message: 'Erro ao processar a lista de membros do corpo diretivo',
  },
}
