import { highLevelEducationEnumSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import z from 'zod'
import { validateActivityAreaRefinement } from '../../helpers/user/validate-activity-area-refinement'
import { commonUserSchema } from './common-user-schema-schema'
import { otherRootFieldsProfessionalAndAcademicSchema } from './other-root-fields-professional-and-academic-schema'
import { otherRootFieldsSchema } from './other-root-fields-schema'
import { professionalAndAcademicUserSchema } from './professional-and-academic-user-schema'

export const highLevelEducationRegisterBodySchema = z
  .object({
    ...otherRootFieldsSchema.shape,
    ...otherRootFieldsProfessionalAndAcademicSchema.shape,
    user: z.object({
      ...commonUserSchema.shape,
      ...professionalAndAcademicUserSchema.shape,
      educationLevel: highLevelEducationEnumSchema,
    }),
  })
  .check(validateActivityAreaRefinement)
