import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllActivityAreasWithAcademicPublicationsQueryRawSchema = z
  .object({
    orderBy: z
      .object({
        publicationsCountOrder: orderDirectionsEnumSchema.default('desc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllActivityAreasWithAcademicPublicationsQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.publicationsCountOrder ? { publicationsCountOrder: query.publicationsCountOrder } : {}),
    },
  }),
  getAllActivityAreasWithAcademicPublicationsQueryRawSchema,
)
