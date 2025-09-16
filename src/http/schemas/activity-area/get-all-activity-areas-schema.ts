import { paginatedSchema } from '@schemas/utils/components/paginated-schema'
import { activityAreaSchema } from '@schemas/utils/enums/activity-area-schema'
import z from 'zod'
import { upperCaseTextSchema } from '../utils/primitives/uppercase-text-schema'

export const getAllActivityAreasSchema = z
  .object({
    name: upperCaseTextSchema,
    type: activityAreaSchema,
  })
  .partial()
  .extend(paginatedSchema.shape)

export type getAllActivityAreasSchemaType = z.infer<typeof getAllActivityAreasSchema>
