import { ACTIVITY_AREA_MISSING_DESCRIPTION } from '@messages/validations'
import { passwordSchema } from '@schemas/utils/components/password-schema'
import {
  highLevelEducationEnumSchema,
  highLevelStudentEnumSchema,
  lowLevelEducationEnumSchema,
} from '@schemas/utils/enums/education-level-enum-schema'
import { stripZodKeys } from '@utils/strip-zod-keys'
import { z } from 'zod'
import {
  commonUserSchema,
  otherRootFieldsProfessionalAndAcademicSchema,
  otherRootFieldsSchema,
  otherRootFieldsStudentAndAcademicSchema,
  professionalAndAcademicUserSchema,
} from './register-body-schema'

export const commonUpdateUserSchema = commonUserSchema
  .omit({
    identity: true,
    interestDescription: true,
    password: true,
  })
  .extend({
    password: passwordSchema,
  })
  .partial()

const professionalAndAcademicUpdateUserSchema = professionalAndAcademicUserSchema

const otherRootFieldsStudentAndAcademicUpdateSchema = otherRootFieldsStudentAndAcademicSchema

const otherRootFieldsProfessionalAndAcademicUpdateSchema = otherRootFieldsProfessionalAndAcademicSchema

const otherRootFieldsUpdateSchema = otherRootFieldsSchema

const lowLevelEducationUpdateBodySchema = z.object({
  ...otherRootFieldsUpdateSchema.shape,
  ...stripZodKeys(otherRootFieldsStudentAndAcademicUpdateSchema).shape,
  ...stripZodKeys(otherRootFieldsProfessionalAndAcademicUpdateSchema).shape,
  user: z.object({
    ...commonUpdateUserSchema.shape,
    ...stripZodKeys(professionalAndAcademicUpdateUserSchema).shape,
    educationLevel: lowLevelEducationEnumSchema,
  }),
})

const highLevelStudentUpdateBodySchema = z.object({
  ...otherRootFieldsUpdateSchema.shape,
  ...otherRootFieldsStudentAndAcademicUpdateSchema.shape,
  ...otherRootFieldsProfessionalAndAcademicUpdateSchema.shape,
  user: z.object({
    ...commonUpdateUserSchema.shape,
    ...professionalAndAcademicUpdateUserSchema.shape,
    educationLevel: highLevelStudentEnumSchema,
  }),
})

const highLevelEducationUpdateBodySchema = z
  .object({
    ...otherRootFieldsUpdateSchema.shape,
    ...stripZodKeys(otherRootFieldsStudentAndAcademicUpdateSchema).shape,
    ...otherRootFieldsProfessionalAndAcademicUpdateSchema.shape,
    user: z.object({
      ...commonUpdateUserSchema.shape,
      ...professionalAndAcademicUpdateUserSchema.shape,
      educationLevel: highLevelEducationEnumSchema,
    }),
  })
  .superRefine((data, ctx) => {
    if (data.activityArea.mainActivityArea === 'OUTRA' && !data.user.activityAreaDescription) {
      ctx.addIssue({
        code: 'custom',
        message: ACTIVITY_AREA_MISSING_DESCRIPTION,
        path: ['activityAreas', 'mainActivityArea'],
      })
    }

    if (data.activityArea.mainActivityArea !== 'OUTRA' && data.user.activityAreaDescription) {
      ctx.addIssue({
        code: 'custom',
        message: ACTIVITY_AREA_MISSING_DESCRIPTION,
        path: ['activityAreas', 'mainActivityArea'],
      })
    }

    if (data.activityArea.subActivityArea === 'OUTRA' && !data.user.subActivityAreaDescription) {
      ctx.addIssue({
        code: 'custom',
        message: ACTIVITY_AREA_MISSING_DESCRIPTION,
        path: ['activityAreas', 'subActivityArea'],
      })
    }

    if (data.activityArea.subActivityArea !== 'OUTRA' && data.user.subActivityAreaDescription) {
      ctx.addIssue({
        code: 'custom',
        message: ACTIVITY_AREA_MISSING_DESCRIPTION,
        path: ['activityAreas', 'subActivityArea'],
      })
    }
  })

export const updateBodySchema = z.union([
  highLevelStudentUpdateBodySchema,
  highLevelEducationUpdateBodySchema,
  lowLevelEducationUpdateBodySchema,
])

export type UpdateUserBodySchemaType = z.infer<typeof updateBodySchema>
