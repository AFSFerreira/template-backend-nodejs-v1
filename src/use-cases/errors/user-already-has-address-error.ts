export class UserAlreadyHasAddressError extends Error {
  constructor() {
    super('The user already has an address.')
  }
}
