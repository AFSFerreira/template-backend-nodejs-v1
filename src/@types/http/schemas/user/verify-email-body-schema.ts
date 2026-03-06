import type { verifyEmailBodySchema } from '@http/schemas/user/verify-email-body-schema'
import type z from 'zod'

export type VerifyEmailBodyType = typeof verifyEmailBodySchema

export type VerifyEmailBodySchemaType = z.infer<VerifyEmailBodyType>
