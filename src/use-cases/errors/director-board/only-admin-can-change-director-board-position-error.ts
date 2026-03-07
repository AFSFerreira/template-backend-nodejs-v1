import { ApiError } from '@errors/api-error'
import { ONLY_ADMIN_CAN_CHANGE_DIRECTOR_BOARD_POSITION } from '@messages/responses/director-board-responses/4xx'

export class OnlyAdminCanChangeDirectorBoardPositionError extends ApiError {
  constructor() {
    super(ONLY_ADMIN_CAN_CHANGE_DIRECTOR_BOARD_POSITION)
  }
}
