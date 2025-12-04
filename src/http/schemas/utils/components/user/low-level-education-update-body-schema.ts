import { lowLevelEducationEnumSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { stripZodKeys } from '@utils/object/strip-zod-keys'
import z from 'zod'
import { commonUpdateUserSchema } from './common-update-user-schema'
import { otherRootFieldsProfessionalAndAcademicSchema } from './other-root-fields-professional-and-academic-schema'
import { otherRootFieldsSchema } from './other-root-fields-schema'
import { otherRootFieldsStudentAndAcademicSchema } from './other-root-fields-student-and-academic-schema'
import { professionalAndAcademicUserSchema } from './professional-and-academic-user-schema'

export const lowLevelEducationUpdateBodySchema = z
  .object({
    ...otherRootFieldsSchema.shape,
    ...stripZodKeys(otherRootFieldsStudentAndAcademicSchema).shape,
    ...stripZodKeys(otherRootFieldsProfessionalAndAcademicSchema).shape,
    user: z
      .object({
        ...commonUpdateUserSchema.shape,
        ...stripZodKeys(professionalAndAcademicUserSchema).shape,
      })
      .partial()
      .extend({ educationLevel: lowLevelEducationEnumSchema }),
  })
  .partial()
