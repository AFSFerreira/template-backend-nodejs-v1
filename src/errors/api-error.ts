import type { IApiResponse, IApiResponseBody } from '@custom-types/responses/api-response'

export class ApiError extends Error {
  public status: number
  public body: IApiResponseBody

  constructor(error: IApiResponse) {
    super(error.body.message)

    this.name = this.constructor.name
    this.status = error.status
    this.body = error.body
  }
}
