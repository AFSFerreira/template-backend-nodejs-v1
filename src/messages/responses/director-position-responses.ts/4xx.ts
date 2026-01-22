import type { IApiResponse } from '@custom-types/responses/api-response'

export const DIRECTOR_POSITION_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'DIRECTOR_POSITION_NOT_FOUND',
    message: 'Cargo de diretoria não encontrado',
  },
}

export const DIRECTOR_POSITION_ALREADY_EXISTS: IApiResponse = {
  status: 409,
  body: {
    code: 'DIRECTOR_POSITION_ALREADY_EXISTS',
    message: 'O cargo de diretoria já existe',
  },
}
