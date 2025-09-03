import type { IdentityType } from '@prisma/client'
import { emailSchema } from '@schemas/utils/email-schema'
import { identityDocumentSchema } from '@schemas/utils/identity-document-schema'
import z from 'zod'
import { usernameSchema } from '../utils/username-schema'

interface CheckAvailabilityQuerySchema {
  identityType?: IdentityType
  identityDocument?: string
  email?: string
  username?: string
}

export const checkAvailabilityQuerySchema = z.preprocess(
  (query: CheckAvailabilityQuerySchema) => ({
    identityType: query.identityType,
    identityDocument: query.identityDocument,
    username: query.username,
    email: query.email,
  }),
  z.intersection(
    z
      .object({
        username: usernameSchema,
        email: emailSchema,
      })
      .partial(),
    z.discriminatedUnion('identityType',
      [identityDocumentSchema,
      z.object({ identityType: z.undefined() })]),
    ),
  )


export type CheckAvailabilityQuerySchemaType = z.infer<
  typeof checkAvailabilityQuerySchema
>
