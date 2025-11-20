import { MAX_INTEREST_DESCRIPTION_SIZE } from '@constants/validation-constants'
import { INVALID_EDUCATION_LEVEL_TYPE } from '@messages/validations'
import { EducationLevelType } from '@prisma/client'
import { academicPublicationsSchema } from '@schemas/utils/components/academic-publication-schema'
import { activityAreaSchema } from '@schemas/utils/components/activity-area-schema'
import { addressSchema } from '@schemas/utils/components/address-schema'
import { enrolledCourseSchema } from '@schemas/utils/components/enrolled-course-schema'
import { identityDocumentSchema } from '@schemas/utils/components/identity-document-schema'
import { institutionSchema } from '@schemas/utils/components/institution-schema'
import { birthdateSchema } from '@schemas/utils/components/limited-date-schema'
import {
  educationLevelSchema,
  highLevelEducationEnumSchema,
  highLevelStudentEnumSchema,
  lowLevelEducationEnumSchema,
} from '@schemas/utils/enums/education-level-enum-schema'
import { occupationEnumSchema } from '@schemas/utils/enums/occupation-enum-schema'
import { booleanSchema } from '@schemas/utils/primitives/boolean-schema'
import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { longLimitedNonemptyTextSchema } from '@schemas/utils/primitives/long-limited-nonempty-text-schema'
import { rangedYearSchema } from '@schemas/utils/primitives/ranged-year-schema'
import { urlSchema } from '@schemas/utils/primitives/url-schema'
import { getTrueMapping } from '@utils/get-true-mapping'
import { stripZodKeys } from '@utils/strip-zod-keys'
import { z } from 'zod'
import { emailSchema } from '../utils/components/email-schema'
import { keywordSchema } from '../utils/components/keyword-schema'
import { orcidNumberSchema } from '../utils/components/orcid-number-schema'
import { passwordSchema } from '../utils/components/password-schema'
import { usernameSchema } from '../utils/components/username-schema'
import { nonemptyTextSchema } from '../utils/primitives/nonempty-text-schema'
import { upperCaseTextSchema } from '../utils/primitives/uppercase-text-schema'
import { validateActivityAreaRefinement } from '@schemas/utils/helpers/validate-activity-area-refinement'

export const commonUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: upperCaseTextSchema,
  username: usernameSchema,
  identity: identityDocumentSchema,
  profileImage: limitedNonemptyTextSchema.optional(),
  birthdate: birthdateSchema,
  emailIsPublic: booleanSchema,
  receiveReports: booleanSchema,
  interestDescription: nonemptyTextSchema.max(MAX_INTEREST_DESCRIPTION_SIZE),
  activityAreaDescription: longLimitedNonemptyTextSchema.optional(),
  subActivityAreaDescription: longLimitedNonemptyTextSchema.optional(),
})

export const professionalAndAcademicUserSchema = z.object({
  linkLattes: urlSchema.optional(),
  linkGoogleScholar: urlSchema.optional(),
  linkResearcherId: urlSchema.optional(),
  secondaryEmail: emailSchema.optional(),
  orcidNumber: orcidNumberSchema.optional(),
  publicInformation: longLimitedNonemptyTextSchema.optional(),
  occupation: occupationEnumSchema,
  departmentName: upperCaseTextSchema,
  astrobiologyOrRelatedStartYear: rangedYearSchema,
})

export const otherRootFieldsStudentAndAcademicSchema = z.object({
  enrolledCourse: enrolledCourseSchema,
})

export const otherRootFieldsProfessionalAndAcademicSchema = z.object({
  keyword: keywordSchema,
  institution: institutionSchema,
  activityArea: activityAreaSchema,
  academicPublication: academicPublicationsSchema.max(5),
})

export const otherRootFieldsSchema = z.object({
  address: addressSchema,
})

const lowLevelEducationRegisterBodySchema = z.object({
  ...otherRootFieldsSchema.shape,
  ...stripZodKeys(otherRootFieldsStudentAndAcademicSchema).shape,
  ...stripZodKeys(otherRootFieldsProfessionalAndAcademicSchema).shape,
  user: z.object({
    ...commonUserSchema.shape,
    ...stripZodKeys(professionalAndAcademicUserSchema).shape,
    educationLevel: lowLevelEducationEnumSchema,
  }),
})

const highLevelStudentRegisterBodySchema = z.object({
  ...otherRootFieldsSchema.shape,
  ...otherRootFieldsStudentAndAcademicSchema.shape,
  ...otherRootFieldsProfessionalAndAcademicSchema.shape,
  user: z.object({
    ...commonUserSchema.shape,
    ...professionalAndAcademicUserSchema.shape,
    educationLevel: highLevelStudentEnumSchema,
  }),
}).superRefine(validateActivityAreaRefinement)

const highLevelEducationRegisterBodySchema = z.object({
  ...otherRootFieldsSchema.shape,
  ...stripZodKeys(otherRootFieldsStudentAndAcademicSchema).shape,
  ...otherRootFieldsProfessionalAndAcademicSchema.shape,
  user: z.object({
    ...commonUserSchema.shape,
    ...professionalAndAcademicUserSchema.shape,
    educationLevel: highLevelEducationEnumSchema,
  }),
})
.superRefine(validateActivityAreaRefinement)

export const registerBodyRawSchema = z.object({
  user: z.object({
    educationLevel: educationLevelSchema,
  }).loose()
})
.loose()

export const registerBodySchema = registerBodyRawSchema.transform((data, ctx) => {
  const educationLevel = data.user.educationLevel

  const targetSchema = getTrueMapping<z.ZodType>([
    {
      expression: highLevelEducationEnumSchema.safeParse(educationLevel).success,
      value: highLevelEducationRegisterBodySchema,
    },
    {
      expression: highLevelStudentEnumSchema.safeParse(educationLevel).success,
      value: highLevelStudentRegisterBodySchema,
    },
    {
      expression: lowLevelEducationEnumSchema.safeParse(educationLevel).success,
      value: lowLevelEducationRegisterBodySchema,
    },
  ])

  if (!targetSchema) {
    ctx.addIssue({
      code: 'custom',
      message: INVALID_EDUCATION_LEVEL_TYPE,
      path: ['user', 'educationLevel'],
      received: educationLevel,
      options: EducationLevelType,
    })
    return z.NEVER
  }

  const result = targetSchema.safeParse(data)

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      ctx.addIssue({ ...issue })
    })
    return z.NEVER
  }

  return result.data
})

type LowLevelType = z.infer<typeof lowLevelEducationRegisterBodySchema>
type HighLevelStudentType = z.infer<typeof highLevelStudentRegisterBodySchema>
type HighLevelEducationType = z.infer<typeof highLevelEducationRegisterBodySchema>

export type RegisterUserBodySchemaType = LowLevelType | HighLevelStudentType | HighLevelEducationType
