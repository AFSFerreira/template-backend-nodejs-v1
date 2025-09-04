import { paginatedSchema } from '@schemas/utils/components/paginated-schema'
import z from 'zod'
import { upperCaseTextSchema } from '../utils/primitives/uppercase-text-schema'
import { activityAreaSchema } from '@schemas/utils/enums/activity-area-schema'

export const getAllActivityAreasSchema = z
  .object({
    name: upperCaseTextSchema.optional(),
    type: activityAreaSchema.optional(),
  })
  .extend(paginatedSchema.shape)

export type getAllActivityAreasSchemaType = z.infer<
  typeof getAllActivityAreasSchema
>
