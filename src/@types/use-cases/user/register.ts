import type { RegisterUserBodySchemaType } from '@custom-types/http/schemas/user/register-body-schema'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'

export type RegisterUseCaseRequest = RegisterUserBodySchemaType

export interface RegisterUseCaseResponse {
  user: UserWithDetails
}
