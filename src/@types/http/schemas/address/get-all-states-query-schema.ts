import type { getAllStatesQuerySchema } from '@http/schemas/address/get-all-states-query-schema'
import type z from 'zod'

export type GetAllStatesQueryType = typeof getAllStatesQuerySchema

export type GetAllStatesQuerySchemaType = z.infer<GetAllStatesQueryType>
