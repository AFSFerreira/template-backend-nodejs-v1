import { highLevelEducationEnumSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { validateActivityAreaRefinement } from '@schemas/utils/helpers/user/validate-activity-area-refinement'
import z from 'zod'
import { commonUpdateUserSchema } from './common-update-user-schema'
import { otherRootFieldsProfessionalAndAcademicSchema } from './other-root-fields-professional-and-academic-schema'
import { otherRootFieldsSchema } from './other-root-fields-schema'
import { professionalAndAcademicUserSchema } from './professional-and-academic-user-schema'

export const highLevelEducationUpdateBodySchema = z
  .object({
    ...otherRootFieldsSchema.shape,
    ...otherRootFieldsProfessionalAndAcademicSchema.shape,
    user: z
      .object({
        ...commonUpdateUserSchema.shape,
        ...professionalAndAcademicUserSchema.shape,
      })
      .partial()
      .extend({ educationLevel: highLevelEducationEnumSchema }),
  })
  .partial()
  .superRefine(validateActivityAreaRefinement)
