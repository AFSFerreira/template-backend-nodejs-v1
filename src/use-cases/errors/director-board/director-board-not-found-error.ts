import { ApiError } from '@errors/api-error'
import { DIRECTOR_BOARD_NOT_FOUND } from '@messages/responses/director-board-responses/4xx'

export class DirectorBoardNotFoundError extends ApiError {
  constructor() {
    super(DIRECTOR_BOARD_NOT_FOUND)
  }
}
