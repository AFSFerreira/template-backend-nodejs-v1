import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 503 Service Unavailable =============

export const RETRIEVE_INSTITUTIONS_ERROR: IApiResponse = {
  status: 503,
  body: {
    code: 'RETRIEVE_INSTITUTIONS_ERROR',
    message: 'Falha ao tentar recuperar as informações das universidades',
  },
}
