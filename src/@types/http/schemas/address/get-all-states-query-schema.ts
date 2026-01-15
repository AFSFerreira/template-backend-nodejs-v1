import type { getAllStatesQuerySchema } from '@schemas/address/get-all-states-query-schema'
import type z from 'zod'

export type GetAllStatesQuerySchemaType = z.infer<typeof getAllStatesQuerySchema>
