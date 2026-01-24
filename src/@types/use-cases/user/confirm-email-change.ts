import type { ConfirmEmailChangeBodySchemaType } from '@custom-types/http/schemas/user/confirm-email-change-body-schema'
import type { User } from '@prisma/client'

export interface ConfirmEmailChangeUseCaseRequest extends ConfirmEmailChangeBodySchemaType {}

export interface ConfirmEmailChangeUseCaseResponse {
  user: User
}
