import type { verifyEmailBodySchema } from '@schemas/user/verify-email-body-schema'
import type z from 'zod'

export type VerifyEmailBodySchemaType = z.infer<typeof verifyEmailBodySchema>
