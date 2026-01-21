import { ApiError } from '@errors/api-error'
import { DIRECTOR_BOARD_IMAGE_STORAGE_ERROR } from '@messages/responses/director-board-responses.ts/5xx'

export class DirectorBoardImageStorageError extends ApiError {
  constructor() {
    super(DIRECTOR_BOARD_IMAGE_STORAGE_ERROR)
  }
}
