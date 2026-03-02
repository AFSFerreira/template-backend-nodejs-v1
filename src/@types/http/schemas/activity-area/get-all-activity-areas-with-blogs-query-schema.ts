import type { getAllActivityAreasWithBlogsQuerySchema } from '@http/schemas/activity-area/get-all-activity-areas-with-blogs-query-schema'
import type { z } from 'zod'

export type GetAllActivityAreasWithBlogsQuerySchemaType = z.infer<typeof getAllActivityAreasWithBlogsQuerySchema>
