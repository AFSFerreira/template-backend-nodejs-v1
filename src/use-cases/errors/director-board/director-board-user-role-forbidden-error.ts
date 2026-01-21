import { ApiError } from '@errors/api-error'
import { DIRECTOR_BOARD_USER_ROLE_FORBIDDEN } from '@messages/responses/director-board-responses.ts/4xx'

export class DirectorBoardUserRoleForbiddenError extends ApiError {
  constructor() {
    super(DIRECTOR_BOARD_USER_ROLE_FORBIDDEN)
  }
}
