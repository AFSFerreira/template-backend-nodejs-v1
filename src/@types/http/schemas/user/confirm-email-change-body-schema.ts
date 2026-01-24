import type { confirmEmailChangeBodySchema } from '@schemas/user/confirm-email-change-body-schema'
import type { z } from 'zod'

export type ConfirmEmailChangeBodySchemaType = z.infer<typeof confirmEmailChangeBodySchema>
