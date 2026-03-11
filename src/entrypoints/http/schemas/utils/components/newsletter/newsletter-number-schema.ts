import { NEWSLETTER_NUMBER } from '@constants/regex-constants'
import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { NEWSLETTER_NUMBER_INVALID } from '@messages/validations/newsletter-validations'

export const newsletterNumberSchema = limitedNonemptyTextSchema.regex(NEWSLETTER_NUMBER, NEWSLETTER_NUMBER_INVALID)
