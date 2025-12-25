import type { IApiError } from '@custom-types/custom/api-error-type'
import { MAX_DOCUMENT_FILE_SIZE_BYTES, MB_IN_BYTES } from '@constants/size-constants'
import { MAX_SLIDER_IMAGES_QUANTITY } from '@constants/static-file-constants'

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

export const SLIDER_ACTIVE_LIMIT_REACHED: IApiError = {
  status: 409,
  body: {
    code: 'SLIDER_ACTIVE_LIMIT_REACHED',
    message: `Limite de ${MAX_SLIDER_IMAGES_QUANTITY} imagens ativas atingido. Desative uma imagem antes de adicionar ou ativar outra.`,
  },
}

export const SLIDER_IMAGE_TOO_SMALL: IApiError = {
  status: 400,
  body: {
    code: 'SLIDER_IMAGE_TOO_SMALL',
    message: 'Imagem muito pequena. Dimensões mínimas: 1920x600px',
  },
}

export const SLIDER_IMAGE_INVALID_ASPECT_RATIO: IApiError = {
  status: 400,
  body: {
    code: 'SLIDER_IMAGE_INVALID_ASPECT_RATIO',
    message: 'Proporção da imagem inválida. Use aspect ratio entre 16:5 e 21:9',
  },
}

export const SLIDER_IMAGE_TOO_LARGE: IApiError = {
  status: 413,
  body: {
    code: 'SLIDER_IMAGE_TOO_LARGE',
    message: 'Arquivo muito grande. Tamanho máximo: 5MB',
  },
}

export const SLIDER_IMAGE_INVALID_FORMAT: IApiError = {
  status: 400,
  body: {
    code: 'SLIDER_IMAGE_INVALID_FORMAT',
    message: 'Formato de imagem inválido. Use JPEG, PNG ou WebP',
  },
}
