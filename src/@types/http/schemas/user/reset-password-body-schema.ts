import type { resetPasswordBodySchema } from '@http/schemas/user/reset-password-body-schema'
import type z from 'zod'

export type ResetPasswordBodyType = typeof resetPasswordBodySchema

export type ResetPasswordBodySchemaType = z.infer<ResetPasswordBodyType>
