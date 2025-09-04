import { birthdateSchema } from '@schemas/utils/components/limited-date-schema'
import { comparableSchema } from '@schemas/utils/enums/comparable-schema'
import { educationLevelSchema } from '@schemas/utils/enums/education-level-schema'
import { membershipStatusSchema } from '@schemas/utils/enums/membership-status-schema'
import { occupationSchema } from '@schemas/utils/enums/occupation-schema'
import { orderDirectionsSchema } from '@schemas/utils/enums/order-directions-schema'
import { userRoleSchema } from '@schemas/utils/enums/user-role-schema'
import { booleanSchema } from '@schemas/utils/primitives/boolean-schema'
import { positiveIntegerSchema } from '@schemas/utils/primitives/positive-integer-schema'
import {
  ASTROBIOLOGY_OR_RELATED_START_YEAR_COMPARISON_MUTUAL_EXISTENCE,
  BIRTHDATE_COMPARISON_MUTUAL_EXISTENCE,
} from 'src/messages/validation'
import { z } from 'zod'
import { getAllUsersSimplifiedQuerySchema } from './get-all-users-simplified-query-schema'
import { keywordSchema } from '../utils/components/keyword-schema'
import { usernameSchema } from '../utils/components/username-schema'
import { emailSchema } from '../utils/primitives/email-schema'
import { upperCaseTextSchema } from '../utils/primitives/uppercase-text-schema'

export const getAllUsersDetailedQuerySchema = z
  .object({
    email: emailSchema,
    username: usernameSchema,
    role: userRoleSchema,
    membershipStatus: membershipStatusSchema,
    departmentName: upperCaseTextSchema,
    specificActivity: upperCaseTextSchema,
    receiveReports: booleanSchema,
    mainActivityArea: upperCaseTextSchema,
    subActivityArea: upperCaseTextSchema,
    keywords: keywordSchema,
    occupation: occupationSchema,
    educationLevel: educationLevelSchema,
    birthdate: birthdateSchema,
    birthdateComparison: comparableSchema,
    astrobiologyOrRelatedStartYear: positiveIntegerSchema,
    astrobiologyOrRelatedStartYearComparison: comparableSchema,
    createdAtOrder: orderDirectionsSchema,
  })
  .partial()
  .extend(getAllUsersSimplifiedQuerySchema.shape)
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
