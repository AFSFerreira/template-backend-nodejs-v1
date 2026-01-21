import { ApiError } from '@errors/api-error'
import { DIRECTOR_POSITION_ALREADY_EXISTS } from '@messages/responses/director-position-responses.ts/4xx'

export class DirectorPositionAlreadyExistsError extends ApiError {
  constructor() {
    super(DIRECTOR_POSITION_ALREADY_EXISTS)
  }
}
