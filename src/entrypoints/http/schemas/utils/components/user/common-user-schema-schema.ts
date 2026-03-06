import { MAX_INTEREST_DESCRIPTION_SIZE } from '@constants/validation-constants'
import { emailSchema } from '@lib/zod/utils/generic-components/email-schema'
import { passwordSchema } from '@lib/zod/utils/generic-components/password-schema'
import { usernameSchema } from '@lib/zod/utils/generic-components/username-schema'
import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { longLimitedNonemptyTextSchema } from '@lib/zod/utils/primitives/long-limited-nonempty-text-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { rangedDateSchema } from '@lib/zod/utils/primitives/ranged-date-schema'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import z from 'zod'
import { identityDocumentSchema } from './identity-document-schema'

export const commonUserSchema = z.object({
  email: emailSchema,
  secondaryEmail: emailSchema.optional(),
  password: passwordSchema,
  fullName: upperCaseTextSchema,
  username: usernameSchema,
  wantsNewsletter: booleanSchema,
  identity: identityDocumentSchema,
  profileImage: limitedNonemptyTextSchema.optional(),
  birthdate: rangedDateSchema,
  emailIsPublic: booleanSchema,
  receiveReports: booleanSchema,
  interestDescription: nonemptyTextSchema.max(MAX_INTEREST_DESCRIPTION_SIZE),
  activityAreaDescription: longLimitedNonemptyTextSchema.optional(),
  subActivityAreaDescription: longLimitedNonemptyTextSchema.optional(),
})
