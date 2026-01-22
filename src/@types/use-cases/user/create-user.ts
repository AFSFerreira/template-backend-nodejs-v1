import type { RegisterUserBodySchemaType } from '@custom-types/http/schemas/user/register-body-schema'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'

export type CreateUserUseCaseRequest = RegisterUserBodySchemaType

export interface CreateUserUseCaseResponse {
  user: UserWithDetails
}
