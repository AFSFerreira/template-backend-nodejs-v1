import type { lowLevelEducationUpdateBodySchema } from '@lib/zod/utils/components/user/low-level-education-update-body-schema'
import type z from 'zod'

export type UpdateUserLowLevelEducationType = z.infer<typeof lowLevelEducationUpdateBodySchema>
