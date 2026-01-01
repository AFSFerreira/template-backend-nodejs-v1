import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import type { UpdateUserUseCaseRequestBody } from './update-user-use-case-request-body'

export interface UpdateUserUseCaseRequest {
  publicId: string
  data: UpdateUserUseCaseRequestBody
}

export interface UpdateUserUseCaseResponse {
  user: UserWithDetails
}
