import type { IApiError } from '@custom-types/errors/api-error'

export const INTERNAL_SERVER_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Erro interno no servidor',
  },
}

export const MULTER_UNKNOWN_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'MULTER_UNKNOWN_ERROR',
    message: 'Ocorreu um erro desconhecido durante o upload do arquivo',
  },
}
