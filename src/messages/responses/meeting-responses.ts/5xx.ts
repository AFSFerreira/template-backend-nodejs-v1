import type { IApiError } from '@custom-types/errors/api-error'

export const MEETING_AGENDA_PERSIST_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'MEETING_AGENDA_PERSIST_ERROR',
    message: 'Erro ao persistir o programa da reunião',
  },
}

export const MEETING_BANNER_PERSIST_ERROR: IApiError = {
  status: 500,
  body: {
    code: 'MEETING_BANNER_PERSIST_ERROR',
    message: 'Erro ao persistir o banner da reunião',
  },
}
