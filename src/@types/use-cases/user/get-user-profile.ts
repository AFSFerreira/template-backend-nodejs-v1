import type { UserWithDetailsDecrypted } from '@custom-types/validators/user-with-details-decrypted'

export interface GetUserProfileUseCaseRequest {
  publicId: string
}

export interface GetUserProfileUseCaseResponse {
  user: UserWithDetailsDecrypted
}
