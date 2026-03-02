import type { getAllActivityAreasSchema } from '@http/schemas/activity-area/get-all-activity-areas-schema'
import type z from 'zod'

export type GetAllActivityAreasSchemaType = z.infer<typeof getAllActivityAreasSchema>
