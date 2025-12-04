import type { highLevelEducationUpdateBodySchema } from '@schemas/utils/components/user/high-level-education-update-body-schema'
import type { highLevelStudentUpdateBodySchema } from '@schemas/utils/components/user/high-level-student-update-body-schema'
import type { lowLevelEducationUpdateBodySchema } from '@schemas/utils/components/user/low-level-education-update-body-schema'
import type z from 'zod'

type LowLevelType = z.infer<typeof lowLevelEducationUpdateBodySchema>
type HighLevelStudentType = z.infer<typeof highLevelStudentUpdateBodySchema>
type HighLevelEducationType = z.infer<typeof highLevelEducationUpdateBodySchema>

export type UpdateUserBodySchemaType = LowLevelType | HighLevelStudentType | HighLevelEducationType
