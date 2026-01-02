import { ApiError } from '@errors/api-error'
import { DIRECTOR_BOARD_NOT_FOUND } from '@messages/responses/director-board-responses'

export class DirectorBoardNotFoundError extends ApiError {
  constructor() {
    super(DIRECTOR_BOARD_NOT_FOUND)
  }
}
