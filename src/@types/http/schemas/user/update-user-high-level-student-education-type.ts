import type { highLevelStudentUpdateBodySchema } from '@lib/zod/utils/components/user/high-level-student-update-body-schema'
import type z from 'zod'

export type UpdateUserHighLevelStudentEducationType = z.infer<typeof highLevelStudentUpdateBodySchema>
