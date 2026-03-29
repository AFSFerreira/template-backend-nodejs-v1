import type { ForgotPasswordBodySchemaType } from '@custom-types/entrypoints/http/schemas/user/forgot-password-body-schema'
import type { User } from '@prisma/generated/client'

export interface ForgotPasswordUseCaseRequest extends ForgotPasswordBodySchemaType {}

export interface ForgotPasswordUseCaseResponse {
  user: User
  token: string
}
