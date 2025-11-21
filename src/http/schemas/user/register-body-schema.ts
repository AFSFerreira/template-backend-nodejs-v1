import type { highLevelEducationRegisterBodySchema } from '@schemas/utils/components/user/high-level-education-register-body-schema'
import type { highLevelStudentRegisterBodySchema } from '@schemas/utils/components/user/high-level-student-register-body-schema'
import type { lowLevelEducationRegisterBodySchema } from '@schemas/utils/components/user/low-level-education-register-body-schema'
import { educationLevelSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { transformRegisterBodySchema } from '@schemas/utils/helpers/transform-register-body.'
import { z } from 'zod'

const registerBodyRawSchema = z
  .object({
    user: z
      .object({
        educationLevel: educationLevelSchema,
      })
      .loose(),
  })
  .loose()

export const registerBodySchema = registerBodyRawSchema.transform(transformRegisterBodySchema)

type LowLevelType = z.infer<typeof lowLevelEducationRegisterBodySchema>
type HighLevelStudentType = z.infer<typeof highLevelStudentRegisterBodySchema>
type HighLevelEducationType = z.infer<typeof highLevelEducationRegisterBodySchema>

export type RegisterUserBodySchemaType = LowLevelType | HighLevelStudentType | HighLevelEducationType
