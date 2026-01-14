import type { getAllActivityAreasSchema } from '@schemas/activity-area/get-all-activity-areas-schema'
import type z from 'zod'

export type GetAllActivityAreasSchemaType = z.infer<typeof getAllActivityAreasSchema>
