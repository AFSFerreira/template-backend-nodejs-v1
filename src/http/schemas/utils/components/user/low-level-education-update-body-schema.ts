import { lowLevelEducationEnumSchema } from '@schemas/utils/enums/education-level-enum-schema'
import z from 'zod'
import { commonUpdateUserSchema } from './common-update-user-schema'
import { otherRootFieldsSchema } from './other-root-fields-schema'

export const lowLevelEducationUpdateBodySchema = z
  .object({
    ...otherRootFieldsSchema.shape,
    user: commonUpdateUserSchema.partial().extend({ educationLevel: lowLevelEducationEnumSchema }),
  })
  .partial()
