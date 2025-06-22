export class UserWithSameEmailOrUsernameError extends Error {
  constructor() {
    super('There is already an user with the same email or username.')
  }
}
