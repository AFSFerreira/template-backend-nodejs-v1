import type { IApiError, IApiErrorBody } from '@custom-types/custom/api-error-type'

export class ApiError extends Error {
  public status: number
  public body: IApiErrorBody

  constructor(error: IApiError) {
    super(error.body.message)

    this.name = this.constructor.name
    this.status = error.status
    this.body = error.body
  }
}
