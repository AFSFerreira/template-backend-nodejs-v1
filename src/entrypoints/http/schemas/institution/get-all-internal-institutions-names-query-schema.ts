import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const getAllInternalInstitutionsNamesQuerySchema = z
  .object({
    name: upperCaseTextSchema.min(5),
  })
  .partial()
  .extend(paginatedSchema.shape)
