import type { UserWithDetails } from '@custom-types/validators/user-with-details'

export interface FindUserByPublicIdUseCaseRequest {
  publicId: string
}

export interface FindUserByPublicIdUseCaseResponse {
  user: UserWithDetails
}
