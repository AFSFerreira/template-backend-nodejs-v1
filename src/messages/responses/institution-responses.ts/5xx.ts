import type { IApiError } from '@custom-types/errors/api-error'

export const RETRIEVE_INSTITUTIONS_ERROR: IApiError = {
  status: 503,
  body: {
    code: 'RETRIEVE_INSTITUTIONS_ERROR',
    message: 'Falha ao tentar recuperar as informações das universidades',
  },
}
