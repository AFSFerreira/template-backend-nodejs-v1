import { ApiError } from '@errors/api-error'
import { MANAGER_CANNOT_UPDATE_OTHER_DIRECTOR_BOARD } from '@messages/responses/director-board-responses.ts/4xx'

export class ManagerCannotUpdateOtherDirectorBoardError extends ApiError {
  constructor() {
    super(MANAGER_CANNOT_UPDATE_OTHER_DIRECTOR_BOARD)
  }
}
