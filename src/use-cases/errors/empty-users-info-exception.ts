export class EmptyUsersInfoException extends Error {
    constructor() {
      super('No available users info to export.')
    }
  }
  