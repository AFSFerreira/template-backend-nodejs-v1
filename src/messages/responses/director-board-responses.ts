import type { IApiError } from '@custom-types/custom/api-error-type'

export const DIRECTOR_BOARD_ALREADY_EXISTS: IApiError = {
  status: 409,
  body: {
    code: 'DIRECTOR_BOARD_ALREADY_EXISTS',
    message: 'O membro do corpo diretivo já existe',
  },
}

export const DIRECTOR_BOARD_USER_ALREADY_EXISTS: IApiError = {
  status: 409,
  body: {
    code: 'DIRECTOR_BOARD_USER_ALREADY_EXISTS',
    message: 'Este usuário já faz parte do corpo diretivo',
  },
}

export const DIRECTOR_BOARD_USER_ROLE_FORBIDDEN: IApiError = {
  status: 403,
  body: {
    code: 'DIRECTOR_BOARD_USER_ROLE_FORBIDDEN',
    message: 'Apenas usuários com permissão de gestor ou administrador podem integrar o corpo diretivo',
  },
}

export const DIRECTOR_BOARD_POSITION_ALREADY_OCCUPIED: IApiError = {
  status: 409,
  body: {
    code: 'DIRECTOR_BOARD_POSITION_ALREADY_OCCUPIED',
    message: 'Este cargo já está ocupado por outro membro',
  },
}

export const DIRECTOR_BOARD_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'DIRECTOR_BOARD_NOT_FOUND',
    message: 'Membro do corpo diretivo não encontrado',
  },
}

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
