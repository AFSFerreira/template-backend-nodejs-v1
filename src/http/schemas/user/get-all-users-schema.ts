import { EducationLevel, Occupation, UserRole } from '@prisma/client'
import { z } from 'zod'
import { keywordSchema } from '../utils/keyword'
import { nonemptyTextSchema } from '../utils/nonempty-text'
import { createZodEnum } from '../utils/zod-enum'
import { comparisonOperators, orderDirections } from '@/@types/orderable-type'

export const getAllUsersParamsSchema = z
  .object({
    fullName: nonemptyTextSchema.optional(),
    username: nonemptyTextSchema.optional(),
    institutionName: nonemptyTextSchema.optional(),
    departmentName: nonemptyTextSchema.optional(),
    specificActivity: nonemptyTextSchema.optional(),
    // REVIEW: verificar se o tipo booleano está passando pelo parse corretamente
    receiveReports: z.coerce.boolean().optional(),
    activityArea: nonemptyTextSchema.optional(),
    keywords: keywordSchema.optional(),
    userRole: createZodEnum(UserRole).optional(),
    occupation: createZodEnum(Occupation).optional(),
    educationLevel: createZodEnum(EducationLevel).optional(),
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
        data.birthdateComparison = 'equals'

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
        data.astrobiologyOrRelatedStartYearComparison = 'equals'

      return true
    },
    {
      message:
        'astrobiologyOrRelatedStartYear must be defined when astrobiologyOrRelatedStartYearComparison is provided',
      path: ['astrobiologyOrRelatedStartYear'],
    },
  )

export type GetAllUsersSchemaType = z.infer<typeof getAllUsersParamsSchema>
