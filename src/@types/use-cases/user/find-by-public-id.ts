import type { FindUserByIdParamsSchemaType } from '@custom-types/http/schemas/user/find-by-public-id-params-schema'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'

export interface FindUserByPublicIdUseCaseRequest extends FindUserByIdParamsSchemaType {}

export interface FindUserByPublicIdUseCaseResponse {
  user: UserWithDetails
}
