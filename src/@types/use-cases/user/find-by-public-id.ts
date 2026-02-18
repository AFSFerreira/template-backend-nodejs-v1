import type { FindUserByIdParamsSchemaType } from '@custom-types/http/schemas/user/find-by-public-id-params-schema'
import type { UserWithDetailsDecrypted } from '@custom-types/validators/user-with-details-decrypted'

export interface FindUserByPublicIdUseCaseRequest extends FindUserByIdParamsSchemaType {}

export interface FindUserByPublicIdUseCaseResponse {
  user: UserWithDetailsDecrypted
}
