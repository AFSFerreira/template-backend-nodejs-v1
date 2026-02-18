import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 500 Internal Server Error =============

export const DECRYPTION_FAILED: IApiResponse = {
  status: 500,
  body: {
    code: 'DECRYPTION_FAILED',
    message: 'Falha ao descriptografar o dado. Integridade comprometida.',
  },
}

export const FILE_SAVE_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'FILE_SAVE_ERROR',
    message: 'Falha ao salvar o arquivo no sistema',
  },
}

export const INTERNAL_SERVER_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Erro interno no servidor',
  },
}

export const MULTER_UNKNOWN_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'MULTER_UNKNOWN_ERROR',
    message: 'Ocorreu um erro desconhecido durante o upload do arquivo',
  },
}
