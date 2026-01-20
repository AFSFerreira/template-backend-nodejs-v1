import { institutionSourceSchema } from '@schemas/utils/components/institution/institution-source-schema'
import { lowercaseTextSchema } from '@schemas/utils/primitives/lowercase-text-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import { upperCaseTextSchema } from '@schemas/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const getAllInstitutionsQuerySchema = z
  .object({
    name: upperCaseTextSchema.min(5),
    source: z.preprocess(
      (query: unknown) => (typeof query === 'string' ? lowercaseTextSchema.parse(query) : query),
      institutionSourceSchema,
    ),
  })
  .partial()
  .extend(paginatedSchema.shape)
