export class EmptyUsersInfoError extends Error {
  constructor() {
    super('No available users info to export.')
  }
}
