import { RNE_VALIDATION_REGEX } from '@constants/regex'
import { IdentityType } from '@prisma/client'
import { INVALID_RNE_FORMAT } from 'src/messages/validation'
import z from 'zod'
import { upperCaseTextSchema } from './uppercase-text-schema'

export const rneSchema = z.object({
  identityType: z.literal(IdentityType.RNE),
  identityDocument: upperCaseTextSchema.regex(
    RNE_VALIDATION_REGEX,
    INVALID_RNE_FORMAT,
  ),
})
