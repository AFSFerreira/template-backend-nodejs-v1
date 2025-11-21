import type { highLevelEducationUpdateBodySchema } from '@schemas/utils/components/user/high-level-education-update-body-schema'
import type { highLevelStudentUpdateBodySchema } from '@schemas/utils/components/user/high-level-student-update-body-schema'
import type { lowLevelEducationUpdateBodySchema } from '@schemas/utils/components/user/low-level-education-update-body-schema'
import { educationLevelSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { transformUpdateBody } from '@schemas/utils/helpers/transform-update-body'
import { z } from 'zod'

const updateBodyRawSchema = z
  .object({
    user: z
      .object({
        educationLevel: educationLevelSchema,
      })
      .loose(),
  })
  .loose()

export const updateBodySchema = updateBodyRawSchema.transform(transformUpdateBody)

type LowLevelType = z.infer<typeof lowLevelEducationUpdateBodySchema>
type HighLevelStudentType = z.infer<typeof highLevelStudentUpdateBodySchema>
type HighLevelEducationType = z.infer<typeof highLevelEducationUpdateBodySchema>

export type UpdateUserBodySchemaType = LowLevelType | HighLevelStudentType | HighLevelEducationType
