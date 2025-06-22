import { UserAlreadyExistsError } from './user-already-exists-error'

export class UserWithSameEmailOrUsernameError extends UserAlreadyExistsError {
  constructor() {
    super('There is already an user with the same email or username.')
  }
}
