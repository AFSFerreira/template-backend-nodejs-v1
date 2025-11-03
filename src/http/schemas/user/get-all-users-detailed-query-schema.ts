import { birthdateSchema } from '@schemas/utils/components/limited-date-schema'
import { membershipStatusArraySchema } from '@schemas/utils/components/membership-status-array-schema'
import { comparableEnumSchema } from '@schemas/utils/enums/comparable-enum-schema'
import { educationLevelSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { occupationEnumSchema } from '@schemas/utils/enums/occupation-enum-schema'
import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { userRoleEnumSchema } from '@schemas/utils/enums/user-role-enum-schema'
import { booleanSchema } from '@schemas/utils/primitives/boolean-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import { positiveIntegerSchema } from '@schemas/utils/primitives/positive-integer-schema'
import { z } from 'zod'
import { emailSchema } from '../utils/components/email-schema'
import { keywordSchema } from '../utils/components/keyword-schema'
import { usernameSchema } from '../utils/components/username-schema'
import { upperCaseTextSchema } from '../utils/primitives/uppercase-text-schema'

const getAllUsersDetailedQueryRawSchema = z
  .object({
    fullName: upperCaseTextSchema,
    institutionName: upperCaseTextSchema,
    state: upperCaseTextSchema,
    email: emailSchema,
    username: usernameSchema,
    membershipStatus: membershipStatusArraySchema,
    departmentName: upperCaseTextSchema,
    role: userRoleEnumSchema,
    receiveReports: booleanSchema,
    mainActivityArea: upperCaseTextSchema,
    subActivityArea: upperCaseTextSchema,
    keywords: keywordSchema,
    occupation: occupationEnumSchema,
    educationLevel: educationLevelSchema,
    birthdate: z.object({
      date: birthdateSchema,
      birthdateComparison: comparableEnumSchema.default('equals'),
    }),
    astrobiologyOrRelatedStartYear: z.object({
      year: positiveIntegerSchema,
      astrobiologyOrRelatedStartYearComparison: comparableEnumSchema.default('equals'),
    }),
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsEnumSchema.default('desc'),
        fullNameOrder: orderDirectionsEnumSchema,
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllUsersDetailedQuerySchema = z.preprocess(
  (query: any) => ({
    ...query,
    birthdate: query.birthdate
      ? {
          date: query.birthdate,
          birthdateComparison: query.birthdateComparison,
        }
      : undefined,
    astrobiologyOrRelatedStartYear: query.astrobiologyOrRelatedStartYear
      ? {
          year: query.astrobiologyOrRelatedStartYear,
          astrobiologyOrRelatedStartYearComparison: query.astrobiologyOrRelatedStartYearComparison,
        }
      : undefined,
    orderBy: {
      ...(query.createdAtOrder ? { createdAtOrder: query.createdAtOrder } : {}),
      ...(query.fullNameOrder ? { fullNameOrder: query.fullNameOrder } : {}),
    },
  }),
  getAllUsersDetailedQueryRawSchema,
)

export type getAllUsersDetailedQuerySchemaType = z.infer<typeof getAllUsersDetailedQuerySchema>
