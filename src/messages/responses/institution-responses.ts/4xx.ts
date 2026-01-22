import type { IApiResponse } from '@custom-types/responses/api-response'

export const INVALID_INSTITUTION_NAME: IApiResponse = {
  status: 400,
  body: {
    code: 'INVALID_INSTITUTION_NAME',
    message: 'Nome da instituição inválido',
  },
}

export const INSTITUTION_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'INSTITUTION_NOT_FOUND',
    message: 'Instituição não encontrada',
  },
}

export const INSTITUTION_ALREADY_EXISTS: IApiResponse = {
  status: 409,
  body: {
    code: 'INSTITUTION_ALREADY_EXISTS',
    message: 'Já existe uma instituição com esse nome',
  },
}
