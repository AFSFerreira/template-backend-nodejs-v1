import { identityDocumentSchema } from '@lib/zod/utils/components/user/identity-document-schema'
import { emailSchema } from '@lib/zod/utils/generic-components/email-schema'
import z from 'zod'
import { usernameSchema } from '../../../lib/zod/utils/generic-components/username-schema'

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
