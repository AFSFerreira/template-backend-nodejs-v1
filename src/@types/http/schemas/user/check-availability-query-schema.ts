import type { checkAvailabilityQuerySchema } from '@http/schemas/user/check-availability-query-schema'
import type z from 'zod'

export type CheckAvailabilityQueryType = typeof checkAvailabilityQuerySchema

export type CheckAvailabilityQuerySchemaType = z.infer<CheckAvailabilityQueryType>
