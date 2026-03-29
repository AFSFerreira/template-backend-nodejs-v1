import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 500 Internal Server Error =============

export const DECRYPTION_FAILED: IApiResponse = {
  status: 500,
  body: {
    code: 'DECRYPTION_FAILED',
    message: 'Falha ao descriptografar o dado. Integridade comprometida.',
  },
}

export const INTERNAL_SERVER_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Erro interno no servidor',
  },
}
