import type { highLevelEducationUpdateBodySchema } from '@http/schemas/utils/components/user/high-level-education-update-body-schema'
import type z from 'zod'

export type UpdateUserHighLevelEducationType = z.infer<typeof highLevelEducationUpdateBodySchema>
