import z from 'zod'
import { commonUserSchema } from './common-user-schema-schema'

export const commonUpdateUserSchema = z.object({
  ...commonUserSchema.omit({
    email: true,
    password: true,
  }).shape,
  identity: z.undefined(),
  interestDescription: z.undefined(),
})
