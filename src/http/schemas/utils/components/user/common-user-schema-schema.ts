import { MAX_INTEREST_DESCRIPTION_SIZE } from '@constants/validation-constants'
import { rangedDateSchema } from '@schemas/utils/primitives/ranged-date-schema'
import z from 'zod'
import { emailSchema } from '../../generic-components/email-schema'
import { passwordSchema } from '../../generic-components/password-schema'
import { usernameSchema } from '../../generic-components/username-schema'
import { booleanSchema } from '../../primitives/boolean-schema'
import { limitedNonemptyTextSchema } from '../../primitives/limited-nonempty-text-schema'
import { longLimitedNonemptyTextSchema } from '../../primitives/long-limited-nonempty-text-schema'
import { nonemptyTextSchema } from '../../primitives/nonempty-text-schema'
import { upperCaseTextSchema } from '../../primitives/uppercase-text-schema'
import { identityDocumentSchema } from './identity-document-schema'

export const commonUserSchema = z.object({
  email: emailSchema,
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
