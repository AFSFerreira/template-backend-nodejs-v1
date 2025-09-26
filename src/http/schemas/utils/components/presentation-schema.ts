import { MAX_INTEREST_DESCRIPTION_SIZE } from '@constants/validation-constants'
import z from 'zod'
import { presentationTypeSchema } from '../enums/presentation-type-schema'
import { nonemptyTextSchema } from '../primitives/nonempty-text-schema'
import { uppercaseTextArraySchema } from '../primitives/uppercase-text-array-schema'
import { upperCaseTextSchema } from '../primitives/uppercase-text-schema'

export const presentationSchema = z.object({
  presentationType: presentationTypeSchema,
  authors: uppercaseTextArraySchema,
  title: upperCaseTextSchema,
  affiliations: uppercaseTextArraySchema,
  description: nonemptyTextSchema.max(MAX_INTEREST_DESCRIPTION_SIZE),
})
