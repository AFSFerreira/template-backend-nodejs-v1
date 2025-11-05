import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import { upperCaseTextSchema } from '@schemas/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const getAllInstitutionsSchema = z
  .object({
    name: upperCaseTextSchema,
  })
  .partial()
  .extend(paginatedSchema.shape)

export type GetAllInstitutionsSchemaType = z.infer<typeof getAllInstitutionsSchema>
