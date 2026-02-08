import { ApiError } from '@errors/api-error'
import { DIRECTOR_BOARD_POSITION_ALREADY_OCCUPIED } from '@messages/responses/director-board-responses/4xx'

export class DirectorBoardPositionAlreadyOccupiedError extends ApiError {
  constructor() {
    super(DIRECTOR_BOARD_POSITION_ALREADY_OCCUPIED)
  }
}
