import { ApiError } from '@errors/api-error'
import { RESOURCE_NOT_FOUND } from '@messages/responses/common-responses/4xx'

export class ResourceNotFoundError extends ApiError {
  constructor(message?: string) {
    super({
      status: RESOURCE_NOT_FOUND.status,
      body: {
        ...RESOURCE_NOT_FOUND.body,
        message: message ?? RESOURCE_NOT_FOUND.body.message,
      },
    })
  }
}
