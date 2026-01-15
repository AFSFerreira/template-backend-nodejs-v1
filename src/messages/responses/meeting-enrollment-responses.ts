import type { IApiError } from '@custom-types/errors/api-error'

export const MEETING_ENROLLMENT_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'MEETING_ENROLLMENT_NOT_FOUND',
    message: 'Inscrição na reunião não encontrada',
  },
}
