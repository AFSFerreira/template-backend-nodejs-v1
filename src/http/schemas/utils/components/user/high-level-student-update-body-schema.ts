import { highLevelStudentEnumSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { validateActivityAreaRefinement } from '@schemas/utils/helpers/user/validate-activity-area-refinement'
import z from 'zod'
import { commonUpdateUserSchema } from './common-update-user-schema'
import { otherRootFieldsProfessionalAndAcademicSchema } from './other-root-fields-professional-and-academic-schema'
import { otherRootFieldsSchema } from './other-root-fields-schema'
import { otherRootFieldsStudentAndAcademicSchema } from './other-root-fields-student-and-academic-schema'
import { professionalAndAcademicUserSchema } from './professional-and-academic-user-schema'

export const highLevelStudentUpdateBodySchema = z
  .object({
    ...otherRootFieldsSchema.shape,
    ...otherRootFieldsStudentAndAcademicSchema.shape,
    ...otherRootFieldsProfessionalAndAcademicSchema.shape,
    user: z
      .object({
        ...commonUpdateUserSchema.shape,
        ...professionalAndAcademicUserSchema.shape,
      })
      .partial()
      .extend({ educationLevel: highLevelStudentEnumSchema }),
  })
  .partial()
  .check(validateActivityAreaRefinement)
