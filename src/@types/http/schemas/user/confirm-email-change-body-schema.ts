import type { confirmEmailChangeBodySchema } from '@http/schemas/user/confirm-email-change-body-schema'
import type { z } from 'zod'

export type ConfirmEmailChangeBodyType = typeof confirmEmailChangeBodySchema

export type ConfirmEmailChangeBodySchemaType = z.infer<ConfirmEmailChangeBodyType>
