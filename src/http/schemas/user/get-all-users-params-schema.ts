import { messages } from '@constants/messages'
import {
  COMPARISON_OPERATORS,
  ORDER_DIRECTIONS,
} from '@custom-types/orderable-type'
import {
  EducationLevelType,
  MembershipStatusType,
  OccupationType,
  UserRoleType,
} from '@prisma/client'
import { z } from 'zod'
import { emailSchema } from '../utils/email'
import { keywordSchema } from '../utils/keyword'
import { upperCaseTextSchema } from '../utils/uppercase-text-schema'
import { usernameSchema } from '../utils/username'

export const getAllUsersParamsSchema = z
  .object({
    fullName: upperCaseTextSchema.optional(),
    email: emailSchema.optional(),
    username: usernameSchema.optional(),
    institutionName: upperCaseTextSchema.optional(),
    role: z.enum(UserRoleType).optional(),
    membershipStatus: z.enum(MembershipStatusType).optional(),
    departmentName: upperCaseTextSchema.optional(),
    specificActivity: upperCaseTextSchema.optional(),
    // REVIEW: verificar se o tipo booleano está passando pelo parse corretamente
    receiveReports: z.coerce.boolean().optional(),
    activityArea: upperCaseTextSchema.optional(),
    keywords: keywordSchema.optional(),
    userRole: z.enum(UserRoleType).optional(),
    occupation: z.enum(OccupationType).optional(),
    educationLevel: z.enum(EducationLevelType).optional(),
    birthdate: z.date().optional(),
    birthdateComparison: z.enum(COMPARISON_OPERATORS).optional(),
    astrobiologyOrRelatedStartYear: z.coerce.number().positive().optional(),
    astrobiologyOrRelatedStartYearComparison: z
      .enum(COMPARISON_OPERATORS)
      .optional(),
    createdAtOrder: z.enum(ORDER_DIRECTIONS).optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
  })
  .refine(
    (data) => {
      // Se birthdateComparison estiver definido, birthdate também deve estar
      if (!data.birthdate) return !data.birthdateComparison

      if (!data.birthdateComparison) data.birthdateComparison = 'equals'

      return true
    },
    {
      message: messages.validation.birthdateComparisonMutualExistence,
      path: ['birthdate'],
    },
  )
  .refine(
    (data) => {
      // Se astrobiologyOrRelatedStartYearComparison estiver definido, astrobiologyOrRelatedStartYear também deve estar
      if (!data.astrobiologyOrRelatedStartYear)
        return !data.astrobiologyOrRelatedStartYearComparison

      if (!data.astrobiologyOrRelatedStartYearComparison)
        data.astrobiologyOrRelatedStartYearComparison = 'equals'

      return true
    },
    {
      message:
        messages.validation
          .astrobiologyOrRelatedStartYearComparisonMutualExistence,
      path: ['astrobiologyOrRelatedStartYear'],
    },
  )

export type GetAllUsersParamsSchemaType = z.infer<
  typeof getAllUsersParamsSchema
>
