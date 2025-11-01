import { MAX_INTEREST_DESCRIPTION_SIZE } from '@constants/validation-constants'
import {
  ACTIVITY_AREA_MISSING_DESCRIPTION,
  COMPLETION_DATE_BEFORE_START_DATE,
  SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
} from '@messages/validations'
import { identityDocumentSchema } from '@schemas/utils/components/identity-document-schema'
import { birthdateSchema } from '@schemas/utils/components/limited-date-schema'
import { highLevelEducationSchema, lowLevelEducationSchema } from '@schemas/utils/enums/education-level-schema'
import { occupationSchema } from '@schemas/utils/enums/occupation-schema'
import { booleanSchema } from '@schemas/utils/primitives/boolean-schema'
import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { longLimitedNonemptyTextSchema } from '@schemas/utils/primitives/long-limited-nonempty-text-schema'
import { rangedYearSchema } from '@schemas/utils/primitives/ranged-year-schema'
import { uppercaseTextArraySchema } from '@schemas/utils/primitives/uppercase-text-array-schema'
import { urlSchema } from '@schemas/utils/primitives/url-schema'
import { stripZodKeys } from '@utils/strip-zod-keys'
import { z } from 'zod'
import { emailSchema } from '../utils/components/email-schema'
import { keywordSchema } from '../utils/components/keyword-schema'
import { monthYearSchema } from '../utils/components/month-year-schema'
import { orcidNumberSchema } from '../utils/components/orcid-number-schema'
import { passwordSchema } from '../utils/components/password-schema'
import { usernameSchema } from '../utils/components/username-schema'
import { nonemptyTextSchema } from '../utils/primitives/nonempty-text-schema'
import { upperCaseTextSchema } from '../utils/primitives/uppercase-text-schema'

const commonUserSchema = z.object({
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

const professionalAndAcademicUserSchema = z.object({
  linkLattes: urlSchema.optional(),
  linkGoogleScholar: urlSchema.optional(),
  linkResearcherId: urlSchema.optional(),
  orcidNumber: orcidNumberSchema.optional(),
  publicInformation: longLimitedNonemptyTextSchema.optional(),
  occupation: occupationSchema,
  departmentName: upperCaseTextSchema,
  astrobiologyOrRelatedStartYear: rangedYearSchema,
})

const otherRootFieldsProfessionalAndAcademicSchema = z.object({
  keyword: keywordSchema,
  institution: z.object({ name: upperCaseTextSchema }),
  activityArea: z.object({
    mainActivityArea: upperCaseTextSchema,
    subActivityArea: upperCaseTextSchema,
  }),

  enrolledCourse: z
    .object({
      courseName: upperCaseTextSchema.optional(),
      startGraduationDate: monthYearSchema,
      expectedGraduationDate: monthYearSchema,
      supervisorName: upperCaseTextSchema.optional(),
      scholarshipHolder: booleanSchema,
      sponsoringOrganization: upperCaseTextSchema.optional(),
    })
    .superRefine((data, ctx) => {
      if (data.startGraduationDate > data.expectedGraduationDate) {
        ctx.addIssue({
          code: 'custom',
          message: COMPLETION_DATE_BEFORE_START_DATE,
          path: ['expectedGraduationDate'],
        })
      }

      if (data.scholarshipHolder && !data.sponsoringOrganization) {
        ctx.addIssue({
          code: 'custom',
          message: SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
          path: ['sponsoringOrganization'],
        })
      }

      if (!data.scholarshipHolder && data.sponsoringOrganization) {
        ctx.addIssue({
          code: 'custom',
          message: SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
          path: ['scholarshipHolder'],
        })
      }
    }),

  academicPublication: z
    .array(
      z.object({
        title: upperCaseTextSchema,
        authors: uppercaseTextArraySchema.min(1),
        publicationYear: rangedYearSchema,
        area: upperCaseTextSchema,
        journalName: upperCaseTextSchema,
        volume: upperCaseTextSchema,
        editionNumber: upperCaseTextSchema,
        startPage: upperCaseTextSchema,
        linkDoi: urlSchema,
      }),
    )
    .max(5),
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
  ...stripZodKeys(otherRootFieldsProfessionalAndAcademicSchema).shape,
  user: z.object({
    ...commonUserSchema.shape,
    ...stripZodKeys(professionalAndAcademicUserSchema).shape,
    educationLevel: lowLevelEducationSchema,
  }),
})

const highLevelEducationRegisterBodySchema = z
  .object({
    ...otherRootFieldsSchema.shape,
    ...otherRootFieldsProfessionalAndAcademicSchema.shape,
    user: z.object({
      ...commonUserSchema.shape,
      ...professionalAndAcademicUserSchema.shape,
      educationLevel: highLevelEducationSchema,
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

export const registerBodySchema = z.union([highLevelEducationRegisterBodySchema, lowLevelEducationRegisterBodySchema])

export type RegisterUserBodySchemaType = z.infer<typeof registerBodySchema>
