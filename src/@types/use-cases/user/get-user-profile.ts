import type { UserWithDetails } from '@custom-types/validators/user-with-details'

export interface GetUserProfileUseCaseRequest {
  publicId: string
}

export interface GetUserProfileUseCaseResponse {
  user: UserWithDetails
}
