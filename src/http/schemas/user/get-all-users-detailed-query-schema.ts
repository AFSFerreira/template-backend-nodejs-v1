import { birthdateSchema } from '@schemas/utils/components/limited-date-schema'
import { membershipStatusArraySchema } from '@schemas/utils/components/membership-status-array-schema'
import { comparableSchema } from '@schemas/utils/enums/comparable-schema'
import { educationLevelSchema } from '@schemas/utils/enums/education-level-schema'
import { occupationSchema } from '@schemas/utils/enums/occupation-schema'
import { orderDirectionsSchema } from '@schemas/utils/enums/order-directions-schema'
import { userRoleSchema } from '@schemas/utils/enums/user-role-schema'
import { booleanSchema } from '@schemas/utils/primitives/boolean-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import { positiveIntegerSchema } from '@schemas/utils/primitives/positive-integer-schema'
import { z } from 'zod'
import { getAllUsersSimplifiedQuerySchema } from './get-all-users-simplified-query-schema'
import { emailSchema } from '../utils/components/email-schema'
import { keywordSchema } from '../utils/components/keyword-schema'
import { usernameSchema } from '../utils/components/username-schema'
import { upperCaseTextSchema } from '../utils/primitives/uppercase-text-schema'

const getAllUsersDetailedQueryRawSchema = z
  .object({
    ...getAllUsersSimplifiedQuerySchema.shape,
    email: emailSchema,
    username: usernameSchema,
    membershipStatus: membershipStatusArraySchema,
    departmentName: upperCaseTextSchema,
    role: userRoleSchema,
    receiveReports: booleanSchema,
    mainActivityArea: upperCaseTextSchema,
    subActivityArea: upperCaseTextSchema,
    keywords: keywordSchema,
    occupation: occupationSchema,
    educationLevel: educationLevelSchema,
    birthdate: z.object({
      date: birthdateSchema,
      birthdateComparison: comparableSchema.default('equals'),
    }),
    astrobiologyOrRelatedStartYear: z.object({
      year: positiveIntegerSchema,
      astrobiologyOrRelatedStartYearComparison: comparableSchema.default('equals'),
    }),
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsSchema.default('desc'),
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
    },
  }),
  getAllUsersDetailedQueryRawSchema,
)

export type getAllUsersDetailedQuerySchemaType = z.infer<typeof getAllUsersDetailedQuerySchema>
