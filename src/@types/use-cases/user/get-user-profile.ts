import type { UserWithDetails } from '@custom-types/validator/user-with-details'

export interface GetUserProfileUseCaseRequest {
  publicId: string
}

export interface GetUserProfileUseCaseResponse {
  user: UserWithDetails
}
