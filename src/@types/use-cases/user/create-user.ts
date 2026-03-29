import type { RegisterUserBodySchemaType } from '@custom-types/entrypoints/http/schemas/user/register-body-schema'
import type { User } from '@prisma/generated/client'

export type CreateUserUseCaseRequest = RegisterUserBodySchemaType

export interface CreateUserUseCaseResponse {
  user: User
}
