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
import {
  ASTROBIOLOGY_OR_RELATED_START_YEAR_COMPARISON_MUTUAL_EXISTENCE,
  BIRTHDATE_COMPARISON_MUTUAL_EXISTENCE,
} from 'src/messages/validation'
import { z } from 'zod'
import { getAllUsersSimplifiedQuerySchema } from './get-all-users-simplified-query-schema'
import { emailSchema } from '../utils/email-schema'
import { keywordSchema } from '../utils/keyword-schema'
import { upperCaseTextSchema } from '../utils/uppercase-text-schema'
import { usernameSchema } from '../utils/username-schema'

export const getAllUsersDetailedQuerySchema = z
  .object({
    email: emailSchema,
    username: usernameSchema,
    role: z.enum(UserRoleType),
    membershipStatus: z.enum(MembershipStatusType),
    departmentName: upperCaseTextSchema,
    specificActivity: upperCaseTextSchema,
    receiveReports: z.coerce.boolean(),
    mainActivityArea: upperCaseTextSchema,
    subActivityArea: upperCaseTextSchema,
    keywords: keywordSchema,
    occupation: z.enum(OccupationType),
    educationLevel: z.enum(EducationLevelType),
    birthdate: z.date(),
    birthdateComparison: z.enum(COMPARISON_OPERATORS),
    astrobiologyOrRelatedStartYear: z.coerce.number().positive(),
    astrobiologyOrRelatedStartYearComparison: z.enum(COMPARISON_OPERATORS),
    createdAtOrder: z.enum(ORDER_DIRECTIONS),
  })
  .extend(getAllUsersSimplifiedQuerySchema.shape)
  .partial()
  .refine(
    (data) => {
      // Se birthdateComparison estiver definido, birthdate também deve estar
      if (!data.birthdate) return !data.birthdateComparison

      if (!data.birthdateComparison) data.birthdateComparison = 'equals'

      return true
    },
    {
      error: BIRTHDATE_COMPARISON_MUTUAL_EXISTENCE,
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
      error: ASTROBIOLOGY_OR_RELATED_START_YEAR_COMPARISON_MUTUAL_EXISTENCE,
      path: ['astrobiologyOrRelatedStartYear'],
    },
  )

export type getAllUsersDetailedQuerySchemaType = z.infer<
  typeof getAllUsersDetailedQuerySchema
>
