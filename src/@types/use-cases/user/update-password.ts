import type { UpdatePasswordBodySchemaType } from '@custom-types/http/schemas/user/update-password-body-schema'

export interface UpdatePasswordUseCaseRequest extends UpdatePasswordBodySchemaType {
  userPublicId: string
}

export interface UpdatePasswordUseCaseResponse {}
