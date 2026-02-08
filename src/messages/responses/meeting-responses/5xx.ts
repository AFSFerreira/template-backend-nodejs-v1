import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 500 Internal Server Error =============

export const MEETING_AGENDA_PERSIST_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'MEETING_AGENDA_PERSIST_ERROR',
    message: 'Erro ao persistir o programa da reunião',
  },
}

export const MEETING_BANNER_PERSIST_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'MEETING_BANNER_PERSIST_ERROR',
    message: 'Erro ao persistir o banner da reunião',
  },
}
