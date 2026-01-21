import type { IApiError } from '@custom-types/errors/api-error'

export const DIRECTOR_POSITION_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'DIRECTOR_POSITION_NOT_FOUND',
    message: 'Cargo de diretoria não encontrado',
  },
}

export const DIRECTOR_POSITION_ALREADY_EXISTS: IApiError = {
  status: 409,
  body: {
    code: 'DIRECTOR_POSITION_ALREADY_EXISTS',
    message: 'O cargo de diretoria já existe',
  },
}
