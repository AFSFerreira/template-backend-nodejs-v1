import z from 'zod'
import { commonUserSchema } from './common-user-schema-schema'
import { otherRootFieldsSchema } from './other-root-fields-schema'
import { lowLevelEducationEnumSchema } from '../../enums/education-level-enum-schema'

export const lowLevelEducationRegisterBodySchema = z.object({
  ...otherRootFieldsSchema.shape,
  user: z.object({
    ...commonUserSchema.shape,
    educationLevel: lowLevelEducationEnumSchema,
  }),
})
