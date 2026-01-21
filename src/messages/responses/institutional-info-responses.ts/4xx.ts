import type { IApiError } from '@custom-types/errors/api-error'

export const INSTITUTIONAL_INFO_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'INSTITUTIONAL_INFO_NOT_FOUND',
    message: 'Informações institucionais não encontradas',
  },
}
