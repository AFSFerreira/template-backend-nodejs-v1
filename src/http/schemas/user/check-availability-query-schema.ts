import type { IdentityType } from '@prisma/client'
import { identityDocumentSchema } from '@schemas/utils/components/identity-document-schema'
import { emailSchema } from '@schemas/utils/primitives/email-schema'
import z from 'zod'
import { usernameSchema } from '../utils/components/username-schema'

type CheckAvailabilityQuerySchema = any & { identityType?: IdentityType }

export const checkAvailabilityQuerySchema = z.preprocess(
  (query: CheckAvailabilityQuerySchema) => ({
    ...query,
    identityType: query.identityType,
  }),
  z.intersection(
    z
      .object({
        username: usernameSchema,
        email: emailSchema,
      })
      .partial(),
    z.discriminatedUnion('identityType', [
      identityDocumentSchema,
      z.object({
        identityType: z.undefined(),
        identityDocument: z.undefined(),
      }),
    ]),
  ),
)

export type CheckAvailabilityQuerySchemaType = z.infer<typeof checkAvailabilityQuerySchema>
