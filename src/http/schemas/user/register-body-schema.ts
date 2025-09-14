import { MAX_INTEREST_DESCRIPTION_SIZE } from '@constants/validation-constants'
import { identityDocumentSchema } from '@schemas/utils/components/identity-document-schema'
import { birthdateSchema } from '@schemas/utils/components/limited-date-schema'
import { rangedYearSchema } from '@schemas/utils/components/ranged-year-schema'
import { highLevelEducationSchema, lowLevelEducationSchema } from '@schemas/utils/enums/education-level-schema'
import { occupationSchema } from '@schemas/utils/enums/occupation-schema'
import { booleanSchema } from '@schemas/utils/primitives/boolean-schema'
import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { longLimitedNonemptyTextSchema } from '@schemas/utils/primitives/long-limited-nonempty-text-schema'
import { urlSchema } from '@schemas/utils/primitives/url-schema'
import { stripZodKeys } from '@utils/strip-zod-keys'
import {
  ACTIVITY_AREA_MISSING_DESCRIPTION,
  COMPLETION_DATE_BEFORE_START_DATE,
  SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
} from 'src/messages/validation'
import { z } from 'zod'
import { keywordSchema } from '../utils/components/keyword-schema'
import { monthYearSchema } from '../utils/components/month-year-schema'
import { orcidNumberSchema } from '../utils/components/orcid-number-schema'
import { passwordSchema } from '../utils/components/password-schema'
import { usernameSchema } from '../utils/components/username-schema'
import { emailSchema } from '../utils/primitives/email-schema'
import { nonemptyTextSchema } from '../utils/primitives/nonempty-text-schema'
import { upperCaseTextSchema } from '../utils/primitives/uppercase-text-schema'

const commonUserSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    fullName: upperCaseTextSchema,
    username: usernameSchema,
    profileImage: limitedNonemptyTextSchema.optional(),
    birthdate: birthdateSchema,
    emailIsPublic: booleanSchema,
    receiveReports: booleanSchema,
    interestDescription: nonemptyTextSchema.max(MAX_INTEREST_DESCRIPTION_SIZE),
    activityAreaDescription: longLimitedNonemptyTextSchema.optional(),
    subActivityAreaDescription: longLimitedNonemptyTextSchema.optional(),
  })
  .extend(
    z.object({
      identity: identityDocumentSchema,
    }).shape,
  )

const professionalAndAcademicUserSchema = z.object({
  linkLattes: urlSchema.optional(),
  linkGoogleScholar: urlSchema.optional(),
  linkResearcherId: urlSchema.optional(),
  orcidNumber: orcidNumberSchema.optional(),
  occupation: occupationSchema,
  departmentName: upperCaseTextSchema,
  astrobiologyOrRelatedStartYear: rangedYearSchema,
  publicInformation: longLimitedNonemptyTextSchema,
})

const otherRootFieldsProfessionalAndAcademicSchema = z.object({
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
    .refine(
      (data) => {
        // A data prevista para a conclusão do curso não pode ser antes da data de ínicio do curso:
        return data.expectedGraduationDate >= data.startGraduationDate
      },
      {
        error: COMPLETION_DATE_BEFORE_START_DATE,
        path: ['expectedGraduationDate'],
      },
    )
    .refine(
      (data) => {
        // Se o usuário for bolsista, precisa possuir um órgão responsável e vice-versa:
        if (data.scholarshipHolder) return !!data.sponsoringOrganization
        return !data.sponsoringOrganization
      },
      {
        error: SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
        path: ['scholarshipHolder'],
      },
    ),

  academicPublication: z
    .array(
      z.object({
        title: upperCaseTextSchema,
        authors: upperCaseTextSchema,
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
  keyword: keywordSchema,
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

const lowLevelEducationRegisterBodySchema = z
  .object({
    user: z
      .object({
        educationLevel: lowLevelEducationSchema,
      })
      .extend(commonUserSchema.shape)
      .extend(stripZodKeys(professionalAndAcademicUserSchema).shape),
  })
  .extend(otherRootFieldsSchema.shape)
  .extend(stripZodKeys(otherRootFieldsProfessionalAndAcademicSchema).shape)

const highLevelEducationRegisterBodySchema = z
  .object({
    user: z
      .object({
        educationLevel: highLevelEducationSchema,
      })
      .extend(commonUserSchema.shape)
      .extend(professionalAndAcademicUserSchema.shape),
  })
  .extend(otherRootFieldsSchema.shape)
  .extend(otherRootFieldsProfessionalAndAcademicSchema.shape)
  .refine(
    (data) => {
      // O usuário precisa fornecer uma descrição caso a área de atividade principal selecionada seja "OUTRA":
      if (data.activityArea.mainActivityArea === 'OUTRA') return !!data.user.activityAreaDescription
      return !data.user.activityAreaDescription
    },
    {
      error: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', 'mainActivityArea'],
    },
  )
  .refine(
    (data) => {
      // O usuário precisa fornecer uma descrição caso a subárea de atividade selecionada seja "OUTRA":
      if (data.activityArea.subActivityArea === 'OUTRA') return !!data.user.subActivityAreaDescription
      return !data.user.subActivityAreaDescription
    },
    {
      error: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', 'subActivityArea'],
    },
  )

export const registerBodySchema = z.union([lowLevelEducationRegisterBodySchema, highLevelEducationRegisterBodySchema])

export type RegisterUserBodySchemaType = z.infer<typeof registerBodySchema>
