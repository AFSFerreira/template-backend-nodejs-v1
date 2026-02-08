import type { IApiResponse } from '@custom-types/responses/api-response'
import { MAX_DOCUMENT_FILE_SIZE_BYTES, MB_IN_BYTES } from '@constants/size-constants'
import { MAX_SLIDER_IMAGES_QUANTITY } from '@constants/static-file-constants'

// ============= 400 Bad Request =============

export const SLIDER_IMAGE_INVALID_ASPECT_RATIO: IApiResponse = {
  status: 400,
  body: {
    code: 'SLIDER_IMAGE_INVALID_ASPECT_RATIO',
    message: 'Proporção da imagem inválida. Use aspect ratio entre 16:5 e 21:9',
  },
}

export const SLIDER_IMAGE_INVALID_FORMAT: IApiResponse = {
  status: 400,
  body: {
    code: 'SLIDER_IMAGE_INVALID_FORMAT',
    message: 'Formato de imagem inválido. Use JPEG, PNG ou WebP',
  },
}

export const SLIDER_IMAGE_TOO_SMALL: IApiResponse = {
  status: 400,
  body: {
    code: 'SLIDER_IMAGE_TOO_SMALL',
    message: 'Imagem muito pequena. Dimensões mínimas: 1920x600px',
  },
}

// ============= 404 Not Found =============

export const MISSING_STATUTE_FILE: IApiResponse = {
  status: 404,
  body: {
    code: 'MISSING_STATUTE_FILE',
    message: 'O arquivo de estatuto não pôde ser encontrado',
  },
}

// ============= 409 Conflict =============

export const SLIDER_ACTIVE_LIMIT_REACHED: IApiResponse = {
  status: 409,
  body: {
    code: 'SLIDER_ACTIVE_LIMIT_REACHED',
    message: `Limite de ${MAX_SLIDER_IMAGES_QUANTITY} imagens ativas atingido. Desative uma imagem antes de adicionar ou ativar outra.`,
  },
}

// ============= 413 Payload Too Large =============

export const DOCUMENT_TOO_BIG: IApiResponse = {
  status: 413,
  body: {
    code: 'DOCUMENT_TOO_BIG',
    message: `O arquivo enviado excede o tamanho limite de ${Math.floor(MAX_DOCUMENT_FILE_SIZE_BYTES / MB_IN_BYTES)}mb`,
  },
}

export const SLIDER_IMAGE_TOO_LARGE: IApiResponse = {
  status: 413,
  body: {
    code: 'SLIDER_IMAGE_TOO_LARGE',
    message: 'Arquivo muito grande. Tamanho máximo: 5MB',
  },
}
