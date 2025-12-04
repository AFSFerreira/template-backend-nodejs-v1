import type { resetPasswordBodySchema } from '@schemas/user/reset-password-body-schema'
import type z from 'zod'

export type ResetPasswordBodySchemaType = z.infer<typeof resetPasswordBodySchema>
