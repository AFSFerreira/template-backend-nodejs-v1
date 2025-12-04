import type { User } from '@prisma/client'

export interface AuthenticateUseCaseRequest {
  login: string
  password: string
  ipAddress?: string
  remotePort?: string
  browser?: string
}

export interface AuthenticateUseCaseResponse {
  user: User
}
