import {
  LONG_LIMITED_CHARACTERS_SIZE,
  MAX_INTEREST_DESCRIPTION_SIZE,
} from '@constants/validation-constants'
import { EducationLevelType, OccupationType } from '@prisma/client'
import { identityDocumentSchema } from '@schemas/utils/identity-document-schema'
import { limitedNonemptyTextSchema } from '@schemas/utils/limited-nonempty-text-schema'
import { longLimitedNonemptyTextSchema } from '@schemas/utils/long-limited-nonempty-text-schema'
import { rangedYearSchema } from '@schemas/utils/ranged-year-schema'
import {
  ACTIVITY_AREA_MISSING_DESCRIPTION,
  COMPLETION_DATE_BEFORE_START_DATE,
  INVALID_ASTROBIOLOGY_OR_RELATED_START_YEAR,
  SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
} from 'src/messages/validation'
import { z } from 'zod'
import { emailSchema } from '../utils/email-schema'
import { keywordSchema } from '../utils/keyword-schema'
import { monthYearSchema } from '../utils/month-year-schema'
import { nonemptyTextSchema } from '../utils/nonempty-text-schema'
import { orcidNumberSchema } from '../utils/orcid-number-schema'
import { passwordSchema } from '../utils/password-schema'
import { upperCaseTextSchema } from '../utils/uppercase-text-schema'
import { usernameSchema } from '../utils/username-schema'

export const registerBodySchema = z
  .object({
    user: z.intersection(
      z
        .object({
          email: emailSchema,
          password: passwordSchema,
          fullName: upperCaseTextSchema,
          username: usernameSchema,
          profileImage: limitedNonemptyTextSchema.optional(),
          birthdate: z.coerce.date(),
          linkLattes: z.url().optional(),
          linkGoogleScholar: z.url().optional(),
          linkResearcherId: z.url().optional(),
          orcidNumber: orcidNumberSchema.optional(),
          departmentName: upperCaseTextSchema.optional(),
          institutionComplement: upperCaseTextSchema.optional(),
          occupation: z.enum(OccupationType),
          educationLevel: z.enum(EducationLevelType),
          emailIsPublic: z.coerce.boolean(),
          astrobiologyOrRelatedStartYear: rangedYearSchema,
          interestDescription: nonemptyTextSchema.max(
            MAX_INTEREST_DESCRIPTION_SIZE,
          ),
          receiveReports: z.coerce.boolean(),
          publicInformation: longLimitedNonemptyTextSchema,
          activityAreaDescription: longLimitedNonemptyTextSchema.optional(),
          subActivityAreaDescription: longLimitedNonemptyTextSchema.optional(),
        })
        .refine(
          (data) => {
            return (
              new Date().getFullYear() >= data.astrobiologyOrRelatedStartYear
            )
          },
          {
            error: INVALID_ASTROBIOLOGY_OR_RELATED_START_YEAR,
            path: ['astrobiologyOrRelatedStartYear'],
          },
        ),
      identityDocumentSchema,
    ),

    activityArea: z.object({
      mainActivityArea: upperCaseTextSchema,
      subActivityArea: upperCaseTextSchema,
    }),

    institution: z.object({
      name: upperCaseTextSchema,
    }),

    keyword: keywordSchema,

    address: z.object({
      zip: upperCaseTextSchema,
      number: upperCaseTextSchema,
      district: upperCaseTextSchema,
      street: upperCaseTextSchema,
      city: upperCaseTextSchema,
      country: upperCaseTextSchema,
      state: upperCaseTextSchema,
      complement: upperCaseTextSchema,
    }),

    enrolledCourse: z
      .object({
        courseName: upperCaseTextSchema.optional(),
        startGraduationDate: monthYearSchema,
        expectedGraduationDate: monthYearSchema,
        supervisorName: upperCaseTextSchema.optional(),
        scholarshipHolder: z.coerce.boolean(),
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
          publicationDate: monthYearSchema,
          area: upperCaseTextSchema,
          journalName: upperCaseTextSchema,
          volume: upperCaseTextSchema,
          editionNumber: upperCaseTextSchema,
          pageInterval: upperCaseTextSchema,
          linkDoi: z.url().max(LONG_LIMITED_CHARACTERS_SIZE),
        }),
      )
      .max(5),
  })
  .refine(
    (data) => {
      // O usuário precisa fornecer uma descrição caso a área de atividade principal selecionada seja "OUTRA":
      if (data.activityArea.mainActivityArea === 'OUTRA')
        return !!data.user.activityAreaDescription
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
      if (data.activityArea.subActivityArea === 'OUTRA')
        return !!data.user.subActivityAreaDescription
      return !data.user.subActivityAreaDescription
    },
    {
      error: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', 'subActivityArea'],
    },
  )

export type RegisterUserBodySchemaType = z.infer<typeof registerBodySchema>
