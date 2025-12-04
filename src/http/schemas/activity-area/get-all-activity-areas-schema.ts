import { activityAreaEnumSchema } from '@schemas/utils/enums/activity-area-enum-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'
import { upperCaseTextSchema } from '../utils/primitives/uppercase-text-schema'

export const getAllActivityAreasSchema = z
  .object({
    name: upperCaseTextSchema,
    type: activityAreaEnumSchema,
  })
  .partial()
  .extend(paginatedSchema.shape)
