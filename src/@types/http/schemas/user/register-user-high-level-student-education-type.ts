import type { highLevelStudentRegisterBodySchema } from '@schemas/utils/components/user/high-level-student-register-body-schema'
import type z from 'zod'

export type RegisterUserHighLevelStudentEducationType = z.infer<typeof highLevelStudentRegisterBodySchema>
