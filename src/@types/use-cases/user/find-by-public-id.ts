import type { FindUserByIdParamsSchemaType } from '@custom-types/entrypoints/http/schemas/user/find-by-public-id-params-schema'
import type { User } from '@prisma/generated/client'

export interface FindUserByIdUseCaseRequest extends FindUserByIdParamsSchemaType {}

export interface FindUserByIdUseCaseResponse {
  user: User
}
