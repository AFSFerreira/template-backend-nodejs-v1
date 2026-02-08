import type { IApiResponse } from '@custom-types/responses/api-response'

// ============= 404 Not Found =============

export const MEETING_ENROLLMENT_NOT_FOUND: IApiResponse = {
  status: 404,
  body: {
    code: 'MEETING_ENROLLMENT_NOT_FOUND',
    message: 'Inscrição na reunião não encontrada',
  },
}
