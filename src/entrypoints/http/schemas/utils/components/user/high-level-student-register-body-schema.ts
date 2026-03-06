import { highLevelStudentEnumSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import z from 'zod'
import { validateActivityAreaRefinement } from '../../helpers/user/validate-activity-area-refinement'
import { commonUserSchema } from './common-user-schema-schema'
import { otherRootFieldsProfessionalAndAcademicSchema } from './other-root-fields-professional-and-academic-schema'
import { otherRootFieldsSchema } from './other-root-fields-schema'
import { otherRootFieldsStudentAndAcademicSchema } from './other-root-fields-student-and-academic-schema'
import { professionalAndAcademicUserSchema } from './professional-and-academic-user-schema'

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
  .check(validateActivityAreaRefinement)
