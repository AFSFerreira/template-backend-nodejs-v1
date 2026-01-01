import type { IApiError } from '@custom-types/custom/api-error-type'

export const MEETING_ENROLLMENT_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'MEETING_ENROLLMENT_NOT_FOUND',
    message: 'Inscrição na reunião não encontrada',
  },
}
