import { ApiError } from '@errors/api-error'
import { DIRECTOR_POSITION_NOT_FOUND } from '@messages/responses/director-position-responses'

export class DirectorPositionNotFoundError extends ApiError {
  constructor() {
    super(DIRECTOR_POSITION_NOT_FOUND)
  }
}
