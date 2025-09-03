import type { IdentityType } from '@prisma/client'
import { emailSchema } from '@schemas/utils/email-schema'
import { identityDocumentSchema } from '@schemas/utils/identity-document-schema'
import z from 'zod'
import { usernameSchema } from '../utils/username-schema'

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

export type CheckAvailabilityQuerySchemaType = z.infer<
  typeof checkAvailabilityQuerySchema
>
