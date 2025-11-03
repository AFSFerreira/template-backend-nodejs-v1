import { MAX_INTEREST_DESCRIPTION_SIZE } from '@constants/validation-constants'
import {
  ACTIVITY_AREA_MISSING_DESCRIPTION,
} from '@messages/validations'
import { academicPublicationsSchema } from '@schemas/utils/components/academic-publication-schema'
import { activityAreaSchema } from '@schemas/utils/components/activity-area-schema'
import { enrolledCourseSchema } from '@schemas/utils/components/enrolled-course-schema'
import { identityDocumentSchema } from '@schemas/utils/components/identity-document-schema'
import { institutionSchema } from '@schemas/utils/components/institution-schema'
import { birthdateSchema } from '@schemas/utils/components/limited-date-schema'
import { highLevelEducationEnumSchema, highLevelStudentEnumSchema, lowLevelEducationEnumSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { occupationEnumSchema } from '@schemas/utils/enums/occupation-enum-schema'
import { booleanSchema } from '@schemas/utils/primitives/boolean-schema'
import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { longLimitedNonemptyTextSchema } from '@schemas/utils/primitives/long-limited-nonempty-text-schema'
import { rangedYearSchema } from '@schemas/utils/primitives/ranged-year-schema'
import { urlSchema } from '@schemas/utils/primitives/url-schema'
import { stripZodKeys } from '@utils/strip-zod-keys'
import { z } from 'zod'
import { emailSchema } from '../utils/components/email-schema'
import { keywordSchema } from '../utils/components/keyword-schema'
import { orcidNumberSchema } from '../utils/components/orcid-number-schema'
import { passwordSchema } from '../utils/components/password-schema'
import { usernameSchema } from '../utils/components/username-schema'
import { nonemptyTextSchema } from '../utils/primitives/nonempty-text-schema'
import { upperCaseTextSchema } from '../utils/primitives/uppercase-text-schema'

const commonUserSchema = z.object({
  email: emailSchema,
  secondaryEmail: emailSchema,
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

const professionalAndAcademicUserSchema = z.object({
  linkLattes: urlSchema.optional(),
  linkGoogleScholar: urlSchema.optional(),
  linkResearcherId: urlSchema.optional(),
  orcidNumber: orcidNumberSchema.optional(),
  publicInformation: longLimitedNonemptyTextSchema.optional(),
  occupation: occupationEnumSchema,
  departmentName: upperCaseTextSchema,
  astrobiologyOrRelatedStartYear: rangedYearSchema,
})

const otherRootFieldsStudentAndAcademicSchema = z.object({
  enrolledCourse: enrolledCourseSchema
})

const otherRootFieldsProfessionalAndAcademicSchema = z.object({
  keyword: keywordSchema,
  institution: institutionSchema,
  activityArea: activityAreaSchema,

  academicPublication: academicPublicationsSchema.max(5),
})

const otherRootFieldsSchema = z.object({
  address: z.object({
    zip: upperCaseTextSchema,
    number: upperCaseTextSchema,
    district: upperCaseTextSchema,
    street: upperCaseTextSchema,
    city: upperCaseTextSchema,
    country: upperCaseTextSchema,
    state: upperCaseTextSchema,
    complement: upperCaseTextSchema.optional(),
  }),
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
})

const highLevelEducationRegisterBodySchema = z
  .object({
    ...otherRootFieldsSchema.shape,
    ...stripZodKeys(otherRootFieldsStudentAndAcademicSchema).shape,
    ...otherRootFieldsProfessionalAndAcademicSchema.shape,
    user: z.object({
      ...commonUserSchema.shape,
      ...professionalAndAcademicUserSchema.shape,
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

export const registerBodySchema = z.union([highLevelStudentRegisterBodySchema, highLevelEducationRegisterBodySchema, lowLevelEducationRegisterBodySchema])

export type FullRegisterUserBodySchemaType = z.infer<typeof highLevelStudentRegisterBodySchema>
export type RegisterUserBodySchemaType = z.infer<typeof registerBodySchema>
