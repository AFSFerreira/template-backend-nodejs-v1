import type { UserWithDetails } from '@custom-types/validator/user-with-details'

export interface FindUserByPublicIdUseCaseRequest {
  publicId: string
}

export interface FindUserByPublicIdUseCaseResponse {
  user: UserWithDetails
}
