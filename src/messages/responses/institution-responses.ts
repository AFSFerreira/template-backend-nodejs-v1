import type { IApiError } from '@custom-types/errors/api-error'

export const INVALID_INSTITUTION_NAME: IApiError = {
  status: 400,
  body: {
    code: 'INVALID_INSTITUTION_NAME',
    message: 'Nome da instituição inválido',
  },
}

export const RETRIEVE_INSTITUTIONS_ERROR: IApiError = {
  status: 503,
  body: {
    code: 'RETRIEVE_INSTITUTIONS_ERROR',
    message: 'Falha ao tentar recuperar as informações das universidades',
  },
}
