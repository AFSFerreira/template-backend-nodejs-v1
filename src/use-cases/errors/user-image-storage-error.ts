export class UserImageStorageError extends Error {
  constructor() {
    super('Error trying to process user profile picture.')
  }
}
