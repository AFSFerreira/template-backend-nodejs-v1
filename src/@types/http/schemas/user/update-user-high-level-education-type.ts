import type { highLevelEducationUpdateBodySchema } from '@lib/zod/utils/components/user/high-level-education-update-body-schema'
import type z from 'zod'

export type UpdateUserHighLevelEducationType = z.infer<typeof highLevelEducationUpdateBodySchema>
