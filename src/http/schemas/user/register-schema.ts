import { EducationLevel, IdentityType, Occupation } from '@prisma/client'
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
import { zipSchema } from '../utils/zip'
import { createZodEnum } from '../utils/zod-enum'
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
        linkLattes: nonemptyTextSchema.url().optional(),
        linkGoogleScholar: nonemptyTextSchema.url().optional(),
        linkResearcherId: nonemptyTextSchema.url().optional(),
        orcidNumber: orcidNumberSchema.optional(),
        institutionName: upperCaseTextSchema,
        departmentName: upperCaseTextSchema.optional(),
        institutionComplement: nonemptyTextSchema.optional(),
        occupation: createZodEnum(Occupation),
        educationLevel: createZodEnum(EducationLevel),
        identityType: createZodEnum(IdentityType),
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
          message: messages.validation.invalidCpf,
        },
      ),

    mainAreaActivity: upperCaseTextSchema,

    keywords: keywordSchema,

    // REVIEW: Avaliar validação de endereço com validações mais sofisticadas
    address: z.object({
      zip: zipSchema,
      number: upperCaseTextSchema,
      district: upperCaseTextSchema,
      street: upperCaseTextSchema,
      city: upperCaseTextSchema,
      country: upperCaseTextSchema,
      state: upperCaseTextSchema,
    }),

    enrolledCourse: z.object({
      courseName: upperCaseTextSchema.optional(),
      startGraduationDate: monthYearSchema,
      expectedGraduationDate: monthYearSchema,
      supervisorName: upperCaseTextSchema.optional(),
      scholarshipHolder: z.coerce.boolean(),
      sponsoringOrganization: upperCaseTextSchema.optional(),
    }),

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
          linkDOI: nonemptyTextSchema.url(),
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
      message:
        messages.validation.mainActivityAreaAndSpecificActivityDescription,
      path: ['user', 'specificActivityDescription'],
    },
  )
  .refine(
    (data) => {
      // Se o usuário for bolsista, precisa possuir um órgão responsável e vice-versa:
      if (data.enrolledCourse.scholarshipHolder)
        return data.enrolledCourse.sponsoringOrganization !== undefined

      return data.enrolledCourse.sponsoringOrganization === undefined
    },
    {
      message: messages.validation.scholarshipHolderAndSponsoringOrganization,
      path: ['enrolledCourse', 'sponsoringOrganization'],
    },
  )

export type RegisterUserSchemaType = z.infer<typeof registerBodySchema>
