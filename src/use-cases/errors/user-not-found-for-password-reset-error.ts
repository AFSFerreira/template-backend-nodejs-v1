export class UserNotFoundForPasswordResetError extends Error {
  constructor() {
    super(
      'If the user exists, you will receive an email with instructions to reset the password.',
    )
  }
}
