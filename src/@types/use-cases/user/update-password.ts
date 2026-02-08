import type { UpdatePasswordBodySchemaType } from '@custom-types/http/schemas/user/update-password-body-schema'

export interface ChangePasswordUseCaseRequest extends UpdatePasswordBodySchemaType {
  userPublicId: string
}

export interface ChangePasswordUseCaseResponse {}
