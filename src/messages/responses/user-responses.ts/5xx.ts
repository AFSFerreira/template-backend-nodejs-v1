import type { IApiResponse } from '@custom-types/responses/api-response'

export const USER_IMAGE_PROCESSING_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'USER_IMAGE_PROCESSING_ERROR',
    message: 'Erro ao tentar processar a foto de perfil do usuário',
  },
}

export const PROFILE_IMAGE_UPDATE_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'PROFILE_IMAGE_UPDATE_ERROR',
    message: 'Erro ao tentar atualizar a foto de perfil do usuário',
  },
}

export const USER_PROFILE_IMAGE_PERSISTENCE_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'USER_PROFILE_IMAGE_PERSISTENCE_ERROR',
    message: 'Erro ao tentar persistir a nova foto de perfil do usuário',
  },
}
