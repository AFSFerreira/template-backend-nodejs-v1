import type { forgotPasswordBodySchema } from '@schemas/user/forgot-password-body-schema'
import type z from 'zod'

export type ForgotPasswordBodySchemaType = z.infer<typeof forgotPasswordBodySchema>
