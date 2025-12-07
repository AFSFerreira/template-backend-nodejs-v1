import type { highLevelStudentUpdateBodySchema } from '@schemas/utils/components/user/high-level-student-update-body-schema'
import type z from 'zod'

export type UpdateUserHighLevelStudentEducationType = z.infer<typeof highLevelStudentUpdateBodySchema>
