import { ApiError } from '@errors/api-error'
import { DIRECTOR_BOARD_LIST_ERROR } from '@messages/responses/director-board-responses.ts/5xx'

export class DirectorBoardListError extends ApiError {
  constructor() {
    super(DIRECTOR_BOARD_LIST_ERROR)
  }
}
