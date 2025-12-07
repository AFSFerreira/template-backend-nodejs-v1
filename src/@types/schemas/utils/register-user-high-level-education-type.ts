import type { highLevelEducationRegisterBodySchema } from '@schemas/utils/components/user/high-level-education-register-body-schema'
import type z from 'zod'

export type RegisterUserHighLevelEducationType = z.infer<typeof highLevelEducationRegisterBodySchema>
