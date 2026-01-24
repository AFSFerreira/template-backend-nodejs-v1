import type { ResetPasswordBodySchemaType } from '@custom-types/http/schemas/user/reset-password-body-schema'
import type { User } from '@prisma/client'

export interface ResetPasswordUseCaseRequest extends ResetPasswordBodySchemaType {}

export interface ResetPasswordUseCaseResponse {
  user: User
}
