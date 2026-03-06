import { emailSchema } from '@lib/zod/utils/generic-components/email-schema'
import { usernameSchema } from '@lib/zod/utils/generic-components/username-schema'
import z from 'zod'
import { identityDocumentSchema } from '../utils/components/user/identity-document-schema'

const checkAvailabilityQueryRawSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    identity: identityDocumentSchema,
  })
  .partial()

export const checkAvailabilityQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
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
