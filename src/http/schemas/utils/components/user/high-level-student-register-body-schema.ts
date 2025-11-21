import z from 'zod'
import { commonUserSchema } from './common-user-schema-schema'
import { otherRootFieldsProfessionalAndAcademicSchema } from './other-root-fields-professional-and-academic-schema'
import { otherRootFieldsSchema } from './other-root-fields-schema'
import { otherRootFieldsStudentAndAcademicSchema } from './other-root-fields-student-and-academic-schema'
import { professionalAndAcademicUserSchema } from './professional-and-academic-user-schema'
import { highLevelStudentEnumSchema } from '../../enums/education-level-enum-schema'
import { validateActivityAreaRefinement } from '../../helpers/validate-activity-area-refinement'

export const highLevelStudentRegisterBodySchema = z
  .object({
    ...otherRootFieldsSchema.shape,
    ...otherRootFieldsStudentAndAcademicSchema.shape,
    ...otherRootFieldsProfessionalAndAcademicSchema.shape,
    user: z.object({
      ...commonUserSchema.shape,
      ...professionalAndAcademicUserSchema.shape,
      educationLevel: highLevelStudentEnumSchema,
    }),
  })
  .superRefine(validateActivityAreaRefinement)
