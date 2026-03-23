import type { User } from '@prisma/generated/client'

export interface GetUserProfileUseCaseRequest {
  id: string
}

export interface GetUserProfileUseCaseResponse {
  user: User
}
