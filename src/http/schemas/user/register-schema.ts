import {
  EducationLevelType,
  IdentityType,
  OccupationType,
} from '@prisma/client'
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
import { messages } from '@/constants/messages'

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
        institutionName: upperCaseTextSchema,
        departmentName: upperCaseTextSchema.optional(),
        institutionComplement: nonemptyTextSchema.optional(),
        occupation: z.enum(OccupationType),
        educationLevel: z.enum(EducationLevelType),
        identityType: z.enum(IdentityType),
        identityDocument: nonemptyTextSchema,
        // REVIEW: Verificar se o tipo booleano está sendo recebido corretamente:
        emailIsPublic: z.coerce.boolean(),
        astrobiologyOrRelatedStartYear: z.coerce.number(),
        interestDescription: nonemptyTextSchema.max(2000),
        receiveReports: z.coerce.boolean(),
        // REVIEW: Confirmar se estes campos são obrigatórios:
        publicInformation: nonemptyTextSchema,
        specificActivity: nonemptyTextSchema,
        specificActivityDescription: nonemptyTextSchema.optional(),
      })
      .refine(
        (data) => {
          if (data.identityType !== IdentityType.CPF) return true

          const result = cpfSchema.safeParse(data.identityDocument)

          return result.success
        },
        {
          error: messages.validation.invalidCpf,
        },
      ),

    mainAreaActivity: upperCaseTextSchema,

    keywords: keywordSchema,

    // REVIEW: Avaliar validação de endereço com validações mais sofisticadas
    address: z.object({
      zip: upperCaseTextSchema,
      number: upperCaseTextSchema,
      district: upperCaseTextSchema,
      street: upperCaseTextSchema,
      city: upperCaseTextSchema,
      country: upperCaseTextSchema,
      state: upperCaseTextSchema,
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
          if (data.scholarshipHolder)
            return data.sponsoringOrganization !== undefined

          return data.sponsoringOrganization === undefined
        },
        {
          error: messages.validation.scholarshipHolderAndSponsoringOrganization,
        },
      ),

    academicPublications: z
      .array(
        z.object({
          title: upperCaseTextSchema,
          authors: upperCaseTextSchema,
          publicationDate: monthYearSchema,
          journalName: upperCaseTextSchema,
          volume: upperCaseTextSchema,
          editionNumber: upperCaseTextSchema,
          pageInterval: upperCaseTextSchema,
          linkDOI: z.url(),
        }),
      )
      .max(5),
  })
  .refine(
    (data) => {
      // Caso o usuário opte pela área de atuação "OTHER",
      // o campo de descrição da área deve ser preenchido e vice-versa
      if (data.mainAreaActivity === 'OTHER')
        return data.user.specificActivityDescription !== undefined

      // data.mainAreaActivity !== 'OTHER':
      return data.user.specificActivityDescription === undefined
    },
    {
      error: messages.validation.mainActivityAreaAndSpecificActivityDescription,
      path: ['user', 'specificActivityDescription'],
    },
  )

export type RegisterUserSchemaType = z.infer<typeof registerBodySchema>
