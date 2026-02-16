import type { getAllActivityAreasWithBlogsQuerySchema } from '@schemas/activity-area/get-all-activity-areas-with-blogs-query-schema'
import type { z } from 'zod'

export type GetAllActivityAreasWithBlogsQuerySchemaType = z.infer<typeof getAllActivityAreasWithBlogsQuerySchema>
