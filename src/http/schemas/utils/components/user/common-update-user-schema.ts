import { passwordSchema } from '@schemas/utils/generic-components/password-schema'
import z from 'zod'
import { commonUserSchema } from './common-user-schema-schema'

export const commonUpdateUserSchema = z.object({
  ...commonUserSchema.shape,
  identity: z.undefined(),
  interestDescription: z.undefined(),
  password: passwordSchema.optional(),
})
