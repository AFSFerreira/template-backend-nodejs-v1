import { comparableEnumSchema } from '@lib/zod/utils/enums/comparable-enum-schema'
import { educationLevelSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import { occupationEnumSchema } from '@lib/zod/utils/enums/occupation-enum-schema'
import { orderDirectionsEnumSchema } from '@lib/zod/utils/enums/order-directions-enum-schema'
import { membershipStatusArraySchema } from '@lib/zod/utils/generic-components/membership-status-array-schema'
import { userRoleArraySchema } from '@lib/zod/utils/generic-components/user-role-array-schema'
import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import { positiveIntegerSchema } from '@lib/zod/utils/primitives/positive-integer-schema'
import { rangedDateSchema } from '@lib/zod/utils/primitives/ranged-date-schema'
import { z } from 'zod'
import { keywordSchema } from '../../../lib/zod/utils/components/keyword/keyword-schema'
import { emailSchema } from '../../../lib/zod/utils/generic-components/email-schema'
import { usernameSchema } from '../../../lib/zod/utils/generic-components/username-schema'
import { upperCaseTextSchema } from '../../../lib/zod/utils/primitives/uppercase-text-schema'

const getAllUsersDetailedQueryRawSchema = z
  .object({
    fullName: upperCaseTextSchema,
    institutionName: upperCaseTextSchema,
    state: upperCaseTextSchema,
    email: emailSchema,
    username: usernameSchema,
    membershipStatus: membershipStatusArraySchema,
    departmentName: upperCaseTextSchema,
    role: userRoleArraySchema,
    receiveReports: booleanSchema,
    mainActivityArea: upperCaseTextSchema,
    subActivityArea: upperCaseTextSchema,
    keywords: keywordSchema,
    occupation: occupationEnumSchema,
    educationLevel: educationLevelSchema,
    birthdate: z.object({
      date: rangedDateSchema,
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
  (query: Record<string, unknown>) => ({
    ...query,
    role: query.role ?? undefined,
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
