import type { VerifyEmailBodySchemaType } from '@custom-types/entrypoints/http/schemas/user/verify-email-body-schema'
import type { User } from '@prisma/generated/client'

export interface VerifyEmailUseCaseRequest extends VerifyEmailBodySchemaType {}

export interface VerifyEmailUseCaseResponse {
  user: User
}
