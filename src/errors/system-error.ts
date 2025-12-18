import type { ISystemError } from '@custom-types/custom/system-error-types'

export class SystemError extends Error {
  public body: ISystemError

  constructor(error: ISystemError) {
    super(error.message)

    this.name = this.constructor.name
    this.body = error
  }
}
