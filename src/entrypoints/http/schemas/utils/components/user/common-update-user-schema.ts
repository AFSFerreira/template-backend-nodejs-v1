import z from 'zod'
import { commonUserSchema } from './common-user-schema-schema'

export const commonUpdateUserSchema = z.object({
  ...commonUserSchema.omit({
    email: true,
    password: true,
    identity: true,
    interestDescription: true,
  }).shape,
})
