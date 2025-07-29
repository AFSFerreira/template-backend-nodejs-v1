import { EducationLevel, IdentityType, Occupation } from '@prisma/client'
import { z } from 'zod'
import { PASSWORD_REGEX, YEAR_MONTH_REGEX } from '@/constants/regex'

export const registerBodySchema = z
  .object({
    user: z.object({
      email: z.string().email().min(6),
      password: z
        .string()
        .min(8)
        .regex(
          PASSWORD_REGEX,
          'The password must contain at least 8 characters, one uppercase letter, one numeric digit and one special character.',
        ),
      fullName: z
        .string()
        .min(5)
        .transform((data) => data.toUpperCase()),
      username: z.string().min(5),
      birthdate: z.coerce.date(),
      linkLattes: z.string().url().nonempty().optional(),
      linkGoogleScholar: z.string().url().nonempty().optional(),
      linkResearcherId: z.string().url().nonempty().optional(),
      orcidNumber: z.coerce.string().nonempty().optional(),
      institutionName: z.string().nonempty(),
      departmentName: z.string().nonempty().optional(),
      institutionComplement: z.string().nonempty().optional(),
      occupation: z.enum(
        Object.values(Occupation as Record<string, string>) as [
          string,
          ...string[],
        ],
      ),
      educationLevel: z.enum(
        Object.values(EducationLevel as Record<string, string>) as [
          string,
          ...string[],
        ],
      ),
      identityType: z.enum(
        Object.values(IdentityType as Record<string, string>) as [
          string,
          ...string[],
        ],
      ),
      identityDocument: z.string().nonempty(),
      // REVIEW: Verificar se o tipo booleano está sendo recebido corretamente:
      emailIsPublic: z.coerce.boolean(),
      astrobiologyOrRelatedStartYear: z.coerce.number(),
      interestDescription: z.string().nonempty().max(2000),
      receiveReports: z.coerce.boolean(),
      publicInformation: z.string().nonempty(),
      specificActivity: z.string().nonempty(),
      specificActivityDescription: z.string().nonempty().optional(),
    }),

    mainAreaActivity: z
      .string()
      .nonempty()
      .transform((data) => data.toLocaleUpperCase()),

    keywords: z
      .array(z.string().nonempty())
      .max(4)
      .transform((data) => {
        return data.map((keyword) => keyword.toUpperCase())
      }),

    // REVIEW: Avaliar validação de endereço com validações mais sofisticadas
    address: z.object({
      zip: z.string().nonempty(),
      number: z.string().nonempty(),
      district: z.string().nonempty(),
      street: z.string().nonempty(),
      city: z.string().nonempty(),
      country: z.string().nonempty(),
      state: z.string().nonempty(),
    }),

    enrolledCourse: z.object({
      courseName: z.string().nonempty().optional(),
      startGraduationDate: z
        .string()
        .nonempty()
        .regex(YEAR_MONTH_REGEX, 'Date must be in format YYYY-MM')
        .transform((str) => new Date(`${str}-01T00:00:00Z`)),
      expectedGraduationDate: z
        .string()
        .nonempty()
        .regex(YEAR_MONTH_REGEX, 'Date must be in format YYYY-MM')
        .transform((str) => new Date(`${str}-01T00:00:00Z`)),
      supervisorName: z.string().nonempty().optional(),
      scholarshipHolder: z.coerce.boolean(),
      sponsoringOrganization: z.string().nonempty().optional(),
    }),

    academicPublications: z
      .array(
        z.object({
          title: z.string().nonempty(),
          authors: z.string().nonempty(),
          publicationDate: z
            .string()
            .nonempty()
            .regex(YEAR_MONTH_REGEX, 'Date must be in format YYYY-MM')
            .transform((str) => new Date(`${str}-01T00:00:00Z`)),
          journalName: z.string().nonempty(),
          volume: z.string().nonempty(),
          editionNumber: z.string().nonempty(),
          pageInterval: z.string().nonempty(),
          doiLink: z.string().nonempty().url(),
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
        'If "Other" is selected as the main area of activity, a description must be provided — and must not be provided otherwise.',
      path: ['specificActivityDescription'],
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
      message:
        'If you are a scholarship holder, you must provide a sponsoring organization — and must leave it blank if you are not.',
      path: ['sponsoringOrganization'],
    },
  )

export type RegisterUserSchemaType = z.infer<typeof registerBodySchema>
