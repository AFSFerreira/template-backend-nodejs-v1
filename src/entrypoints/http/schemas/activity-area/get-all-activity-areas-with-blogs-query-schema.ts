import { orderDirectionsEnumSchema } from '@lib/zod/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllActivityAreasWithBlogsQueryRawSchema = z
  .object({
    orderBy: z
      .object({
        blogsCountOrder: orderDirectionsEnumSchema.default('desc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllActivityAreasWithBlogsQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.blogsCountOrder ? { blogsCountOrder: query.blogsCountOrder } : {}),
    },
  }),
  getAllActivityAreasWithBlogsQueryRawSchema,
)
