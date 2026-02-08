import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 404 Not Found =============

export const DIRECTOR_POSITION_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'DIRECTOR_POSITION_NOT_FOUND',
    message: 'Cargo de diretoria não encontrado',
  },
}

// ============= 409 Conflict =============

export const DIRECTOR_POSITION_ALREADY_EXISTS: IApiResponse = {
  status: 409,
  body: {
    code: 'DIRECTOR_POSITION_ALREADY_EXISTS',
    message: 'O cargo de diretoria já existe',
  },
}
