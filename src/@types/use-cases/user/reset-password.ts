import type { User } from '@prisma/client'

export interface ResetPasswordUseCaseRequest {
  newPassword: string
  token: string
}

export interface ResetPasswordUseCaseResponse {
  user: User
}
