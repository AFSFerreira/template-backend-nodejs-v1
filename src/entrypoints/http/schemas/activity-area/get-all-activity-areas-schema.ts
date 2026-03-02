import { activityAreaEnumSchema } from '@lib/zod/utils/enums/activity-area-enum-schema'
import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const getAllActivityAreasSchema = z
  .object({
    name: upperCaseTextSchema,
    type: activityAreaEnumSchema,
  })
  .partial()
  .extend(paginatedSchema.shape)
