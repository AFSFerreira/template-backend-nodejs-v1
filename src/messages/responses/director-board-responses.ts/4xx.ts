import type { IApiResponse } from '@custom-types/responses/api-response'

export const DIRECTOR_BOARD_USER_ROLE_FORBIDDEN: IApiResponse = {
  status: 403,
  body: {
    code: 'DIRECTOR_BOARD_USER_ROLE_FORBIDDEN',
    message: 'Apenas usuários com permissão de gestor ou administrador podem integrar o corpo diretivo',
  },
}

export const MANAGER_CANNOT_UPDATE_OTHER_DIRECTOR_BOARD: IApiResponse = {
  status: 403,
  body: {
    code: 'MANAGER_CANNOT_UPDATE_OTHER_DIRECTOR_BOARD',
    message: 'Gestores só podem atualizar seu próprio perfil do corpo diretivo',
  },
}

export const DIRECTOR_BOARD_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'DIRECTOR_BOARD_NOT_FOUND',
    message: 'Membro do corpo diretivo não encontrado',
  },
}

export const DIRECTOR_BOARD_ALREADY_EXISTS: IApiResponse = {
  status: 409,
  body: {
    code: 'DIRECTOR_BOARD_ALREADY_EXISTS',
    message: 'O membro do corpo diretivo já existe',
  },
}

export const DIRECTOR_BOARD_POSITION_ALREADY_OCCUPIED: IApiResponse = {
  status: 409,
  body: {
    code: 'DIRECTOR_BOARD_POSITION_ALREADY_OCCUPIED',
    message: 'Este cargo já está ocupado por outro membro',
  },
}

export const DIRECTOR_BOARD_USER_ALREADY_EXISTS: IApiResponse = {
  status: 409,
  body: {
    code: 'DIRECTOR_BOARD_USER_ALREADY_EXISTS',
    message: 'Este usuário já faz parte do corpo diretivo',
  },
}
