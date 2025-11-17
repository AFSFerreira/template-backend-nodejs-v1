import { emailSchema } from '@schemas/utils/components/email-schema'
import { identityDocumentSchema } from '@schemas/utils/components/identity-document-schema'
import z from 'zod'
import { usernameSchema } from '../utils/components/username-schema'

const checkAvailabilityQueryRawSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  secondaryEmail: emailSchema,
  identity: identityDocumentSchema,
})
.partial()

export const checkAvailabilityQuerySchema = z.preprocess(
  (query: any) => ({
    ...query,
    ...(query.identityType || query.identityDocument
      ? {
          identity: {
            identityType: query.identityType,
            identityDocument: query.identityDocument,
          },
        }
      : {}),
  }),
  checkAvailabilityQueryRawSchema,
)

export type CheckAvailabilityQuerySchemaType = z.infer<typeof checkAvailabilityQuerySchema>
