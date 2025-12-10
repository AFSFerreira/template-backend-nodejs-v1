import type { IApiError } from '@custom-types/custom/api-error-type'
import { MAX_DOCUMENT_FILE_SIZE_BYTES, MB_IN_BYTES } from '@constants/size-constants'

export const MISSING_STATUTE_FILE: IApiError = {
  status: 404,
  body: {
    code: 'MISSING_STATUTE_FILE',
    message: 'O arquivo de estatuto não pôde ser encontrado',
  },
}

export const DOCUMENT_TOO_BIG: IApiError = {
  status: 413,
  body: {
    code: 'DOCUMENT_TOO_BIG',
    message: `O arquivo enviado excede o tamanho limite de ${Math.floor(MAX_DOCUMENT_FILE_SIZE_BYTES / MB_IN_BYTES)}mb`,
  },
}
