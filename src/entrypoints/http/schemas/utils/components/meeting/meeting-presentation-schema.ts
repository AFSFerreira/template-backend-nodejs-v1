import { MAX_INTEREST_DESCRIPTION_SIZE } from '@constants/validation-constants'
import { presentationTypeEnumSchema } from '@lib/zod/utils/enums/presentation-type-enum-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { uppercaseTextArraySchema } from '@lib/zod/utils/primitives/uppercase-text-array-schema'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const meetingPresentationSchema = z.object({
  presentationType: presentationTypeEnumSchema,
  authors: uppercaseTextArraySchema,
  title: upperCaseTextSchema,
  affiliations: uppercaseTextArraySchema,
  description: nonemptyTextSchema.max(MAX_INTEREST_DESCRIPTION_SIZE),
})
