import { EDUCATION_LEVEL, OCCUPATION, USER_ROLE } from '@prisma/client'
import { z } from 'zod'
import { comparisonOperators, orderDirections } from '@/@types/orderable-type'

export const getAllUsersParamsSchema = z
  .object({
    fullName: z.string().nonempty().optional(),
    username: z.string().nonempty().optional(),
    institutionName: z.string().nonempty().optional(),
    departmentName: z.string().nonempty().optional(),
    specificActivity: z.string().nonempty().optional(),
    // REVIEW: verificar se o tipo booleano está passando pelo parse corretamente
    receiveReports: z.coerce.boolean().optional(),
    activityArea: z.string().nonempty().optional(),
    keywords: z
      .union([z.string().nonempty(), z.array(z.string().nonempty())])
      .optional()
      .transform((val) => {
        return typeof val === 'string' ? [val] : val
      }),
    userRole: z
      .enum(Object.values(USER_ROLE) as [string, ...string[]])
      .optional(),
    occupation: z
      .enum(Object.values(OCCUPATION) as [string, ...string[]])
      .optional(),
    educationLevel: z
      .enum(Object.values(EDUCATION_LEVEL) as [string, ...string[]])
      .optional(),
    birthdate: z.date().optional(),
    birthdateComparison: z.enum(comparisonOperators).optional(),
    astrobiologyOrRelatedStartYear: z.coerce.number().positive().optional(),
    astrobiologyOrRelatedStartYearComparison: z
      .enum(comparisonOperators)
      .optional(),
    createdAtOrder: z.enum(orderDirections).optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
  })
  .refine(
    (data) => {
      // Se birthdateComparison estiver definido, birthdate também deve estar
      if (data.birthdate === undefined)
        return data.birthdateComparison === undefined

      if (data.birthdateComparison === undefined)
        data.birthdateComparison = 'eq'

      return true
    },
    {
      message: 'birthdate must be defined when birthdateComparison is provided',
      path: ['birthdate'],
    },
  )
  .refine(
    (data) => {
      // Se astrobiologyOrRelatedStartYearComparison estiver definido, astrobiologyOrRelatedStartYear também deve estar
      if (data.astrobiologyOrRelatedStartYear === undefined)
        return data.astrobiologyOrRelatedStartYearComparison === undefined

      if (data.astrobiologyOrRelatedStartYearComparison === undefined)
        data.astrobiologyOrRelatedStartYearComparison = 'eq'

      return true
    },
    {
      message:
        'astrobiologyOrRelatedStartYear must be defined when astrobiologyOrRelatedStartYearComparison is provided',
      path: ['astrobiologyOrRelatedStartYear'],
    },
  )

export type getAllUsersSchemaType = z.infer<typeof getAllUsersParamsSchema>
