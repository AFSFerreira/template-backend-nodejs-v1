import { highLevelEducationEnumSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { validateActivityAreaRefinement } from '@schemas/utils/helpers/validate-activity-area-refinement'
import { stripZodKeys } from '@utils/strip-zod-keys'
import z from 'zod'
import { commonUpdateUserSchema } from './common-update-user-schema'
import { otherRootFieldsProfessionalAndAcademicSchema } from './other-root-fields-professional-and-academic-schema'
import { otherRootFieldsSchema } from './other-root-fields-schema'
import { otherRootFieldsStudentAndAcademicSchema } from './other-root-fields-student-and-academic-schema'
import { professionalAndAcademicUserSchema } from './professional-and-academic-user-schema'

export const highLevelEducationUpdateBodySchema = z
  .object({
    ...otherRootFieldsSchema.shape,
    ...stripZodKeys(otherRootFieldsStudentAndAcademicSchema).shape,
    ...otherRootFieldsProfessionalAndAcademicSchema.shape,
    user: z.object({
      ...commonUpdateUserSchema.shape,
      ...professionalAndAcademicUserSchema.shape,
      educationLevel: highLevelEducationEnumSchema,
    }),
  })
  .superRefine(validateActivityAreaRefinement)
