import { messages } from '@constants/messages'
import { MAX_INTEREST_DESCRIPTION_SIZE } from '@constants/zod-constants'
import type {
  LiteralEducationLevelEnType,
  LiteralEducationLevelPtType,
} from '@custom-types/literal-education-level-type'
import { ALL_LITERAL_EDUCATION_LEVEL_OPTIONS } from '@custom-types/literal-education-level-type'
import { LANGUAGE_OPTIONS } from '@custom-types/translation-language-type'
import { IdentityType, OccupationType } from '@prisma/client'
import {
  translateEducationLevelToEnumEn,
  translateEducationLevelToEnumPt,
} from '@services/translate-education-level'
import { z } from 'zod'
import { cpfSchema } from '../utils/cpf'
import { emailSchema } from '../utils/email'
import { keywordSchema } from '../utils/keyword'
import { monthYearSchema } from '../utils/month-year-schema'
import { nonemptyTextSchema } from '../utils/nonempty-text'
import { orcidNumberSchema } from '../utils/orcid-number'
import { passwordSchema } from '../utils/password'
import { upperCaseTextSchema } from '../utils/uppercase-text-schema'
import { usernameSchema } from '../utils/username'

export const registerBodySchema = z
  .object({
    user: z
      .object({
        email: emailSchema,
        password: passwordSchema,
        fullName: upperCaseTextSchema,
        username: usernameSchema,
        birthdate: z.coerce.date(),
        linkLattes: z.url().optional(),
        linkGoogleScholar: z.url().optional(),
        linkResearcherId: z.url().optional(),
        orcidNumber: orcidNumberSchema.optional(),
        departmentName: upperCaseTextSchema.optional(),
        institutionComplement: upperCaseTextSchema.optional(),
        occupation: z.enum(OccupationType),
        educationLevel: upperCaseTextSchema,
        identityType: z.enum(IdentityType),
        identityDocument: upperCaseTextSchema,
        // REVIEW: Verificar se o tipo booleano está sendo recebido corretamente:
        emailIsPublic: z.coerce.boolean(),
        astrobiologyOrRelatedStartYear: z.coerce.number(),
        interestDescription: nonemptyTextSchema.max(
          MAX_INTEREST_DESCRIPTION_SIZE as number,
        ),
        receiveReports: z.coerce.boolean(),
        // REVIEW: Confirmar se estes campos são obrigatórios:
        publicInformation: nonemptyTextSchema,
        activityAreaDescription: nonemptyTextSchema.optional(),
        subActivityAreaDescription: nonemptyTextSchema.optional(),
      })
      .refine(
        (data) => {
          if (data.identityType !== IdentityType.CPF) return true

          return cpfSchema.safeParse(data.identityDocument)
        },
        {
          error: messages.validation.invalidCpf,
        },
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
          error: messages.validation.completionDateBeforeStartDate,
        },
      )
      .refine(
        (data) => {
          // Se o usuário for bolsista, precisa possuir um órgão responsável e vice-versa:
          if (data.scholarshipHolder) return !!data.sponsoringOrganization

          return !data.sponsoringOrganization
        },
        {
          error: messages.validation.scholarshipHolderAndSponsoringOrganization,
        },
      ),

    academicPublication: z
      .array(
        z.object({
          title: upperCaseTextSchema,
          authors: upperCaseTextSchema,
          publicationDate: monthYearSchema,
          tag: upperCaseTextSchema,
          journalName: upperCaseTextSchema,
          volume: upperCaseTextSchema,
          editionNumber: upperCaseTextSchema,
          pageInterval: upperCaseTextSchema,
          linkDOI: z.url(),
        }),
      )
      .max(5),

    lang: z.enum(LANGUAGE_OPTIONS).default('pt'),
  })
  .refine(
    (data) => {
      // O usuário precisa fornecer uma descrição caso a área de atividade principal selecionada seja "OUTRA":
      if (
        data.activityArea.mainActivityArea === 'OUTRA' ||
        data.activityArea.mainActivityArea === 'OTHER'
      )
        return !!data.user.activityAreaDescription

      return !data.user.activityAreaDescription
    },
    {
      error: messages.validation.activityAreaMissingDescription,
      path: ['activityAreas', 'activityArea'],
    },
  )
  .refine(
    (data) => {
      // O usuário precisa fornecer uma descrição caso a subárea de atividade selecionada seja "OUTRA":
      if (
        data.activityArea.subActivityArea === 'OUTRA' ||
        data.activityArea.subActivityArea === 'OTHER'
      )
        return !!data.user.subActivityAreaDescription
      return !data.user.subActivityAreaDescription
    },
    {
      error: messages.validation.activityAreaMissingDescription,
      path: ['activityAreas', 'subActivityArea'],
    },
  )
  .refine(
    (data) => {
      if (!ALL_LITERAL_EDUCATION_LEVEL_OPTIONS.has(data.user.educationLevel)) {
        return false
      }

      switch (data.lang) {
        case 'pt':
          data.user.educationLevel = translateEducationLevelToEnumPt(
            data.user.educationLevel as LiteralEducationLevelPtType,
          )
          break
        case 'en':
          data.user.educationLevel = translateEducationLevelToEnumEn(
            data.user.educationLevel as LiteralEducationLevelEnType,
          )
          break
      }

      return true
    },
    {
      error: messages.validation.invalidEducationLevelType,
      path: ['user', 'educationLevel'],
    },
  )

export type RegisterUserBodySchemaType = z.infer<typeof registerBodySchema>
