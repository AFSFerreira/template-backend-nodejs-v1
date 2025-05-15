import type { ResetPasswordBodySchemaType } from '@custom-types/entrypoints/http/schemas/user/reset-password-body-schema'
import type { User } from '@prisma/generated/client'

export interface ResetPasswordUseCaseRequest extends ResetPasswordBodySchemaType {}

export interface ResetPasswordUseCaseResponse {
  user: User
}
