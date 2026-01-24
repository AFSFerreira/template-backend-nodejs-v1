import type { AuthenticateSchemaType } from '@custom-types/http/schemas/user/authenticate-body-schema'
import type { User } from '@prisma/client'

export interface AuthenticateUseCaseRequest extends AuthenticateSchemaType {
  ipAddress?: string
  remotePort?: string
  browser?: string
}

export interface AuthenticateUseCaseResponse {
  user: User
}
