import type { User } from '@prisma/client'

export interface ForgotPasswordUseCaseRequest {
  login: string
}

export interface ForgotPasswordUseCaseResponse {
  user: User
  token: string
}
