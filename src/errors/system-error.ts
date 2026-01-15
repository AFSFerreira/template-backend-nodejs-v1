import type { ISystemError } from '@custom-types/errors/system-error'

export class SystemError extends Error {
  public body: ISystemError

  constructor(error: ISystemError) {
    super(error.message)

    this.name = this.constructor.name
    this.body = error
  }
}
