import type { AuthenticateSchemaType } from '@custom-types/entrypoints/http/schemas/user/authenticate-body-schema'
import type { AuthenticateConnectionInfoSchemaType } from '@custom-types/entrypoints/http/schemas/user/authenticate-connection-info-schema'
import type { User } from '@prisma/generated/client'

export interface AuthenticateUseCaseRequest extends AuthenticateSchemaType, AuthenticateConnectionInfoSchemaType {}

export interface AuthenticateUseCaseResponse {
  user: User
}
