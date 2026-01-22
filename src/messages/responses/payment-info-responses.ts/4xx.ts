import type { IApiResponse } from '@custom-types/responses/api-response'

export const PAYMENT_INFO_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'PAYMENT_INFO_NOT_FOUND',
    message: 'Informações de pagamento não encontradas',
  },
}
