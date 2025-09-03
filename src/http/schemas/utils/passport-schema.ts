import { PASSPORT_VALIDATION_REGEX } from '@constants/regex'
import { IdentityType } from '@prisma/client'
import { INVALID_PASSPORT_FORMAT } from 'src/messages/validation'
import z from 'zod'
import { upperCaseTextSchema } from './uppercase-text-schema'

export const passportSchema = z.object({
  identityType: z.literal(IdentityType.PASSPORT),
  identityDocument: upperCaseTextSchema.regex(
    PASSPORT_VALIDATION_REGEX,
    INVALID_PASSPORT_FORMAT,
  ),
})
