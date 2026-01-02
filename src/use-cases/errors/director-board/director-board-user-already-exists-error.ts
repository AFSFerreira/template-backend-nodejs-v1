import { ApiError } from '@errors/api-error'
import { DIRECTOR_BOARD_USER_ALREADY_EXISTS } from '@messages/responses/director-board-responses'

export class DirectorBoardUserAlreadyExistsError extends ApiError {
  constructor() {
    super(DIRECTOR_BOARD_USER_ALREADY_EXISTS)
  }
}
