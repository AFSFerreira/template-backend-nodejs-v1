import type { checkAvailabilityQuerySchema } from '@schemas/user/check-availability-query-schema'
import type z from 'zod'

export type CheckAvailabilityQuerySchemaType = z.infer<typeof checkAvailabilityQuerySchema>
