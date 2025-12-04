import type { highLevelEducationRegisterBodySchema } from '@schemas/utils/components/user/high-level-education-register-body-schema'
import type { highLevelStudentRegisterBodySchema } from '@schemas/utils/components/user/high-level-student-register-body-schema'
import type { lowLevelEducationRegisterBodySchema } from '@schemas/utils/components/user/low-level-education-register-body-schema'
import type z from 'zod'

type LowLevelType = z.infer<typeof lowLevelEducationRegisterBodySchema>
type HighLevelStudentType = z.infer<typeof highLevelStudentRegisterBodySchema>
type HighLevelEducationType = z.infer<typeof highLevelEducationRegisterBodySchema>

export type RegisterUserBodySchemaType = LowLevelType | HighLevelStudentType | HighLevelEducationType
