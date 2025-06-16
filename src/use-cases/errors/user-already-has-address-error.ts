export class UserAlreadyHasAddressError extends Error {
  constructor(message: string = 'The user already has an address.') {
    super(message)
  }
}
