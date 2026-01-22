import type { IApiResponse } from '@custom-types/responses/api-response'

export const INSTITUTIONAL_INFO_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'INSTITUTIONAL_INFO_NOT_FOUND',
    message: 'Informações institucionais não encontradas',
  },
}
