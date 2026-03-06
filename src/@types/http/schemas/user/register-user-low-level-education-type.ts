import type { lowLevelEducationRegisterBodySchema } from '@http/schemas/utils/components/user/low-level-education-register-body-schema'
import type z from 'zod'

export type RegisterUserLowLevelEducationType = z.infer<typeof lowLevelEducationRegisterBodySchema>
