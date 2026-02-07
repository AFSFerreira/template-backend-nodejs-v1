import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

const getAcademicPublicationsYearsQueryRawSchema = z
  .object({
    orderBy: z
      .object({
        yearOrder: orderDirectionsEnumSchema.default('desc'),
        countOrder: orderDirectionsEnumSchema,
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAcademicPublicationsYearsQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.yearOrder ? { yearOrder: query.yearOrder } : {}),
      ...(query.countOrder ? { countOrder: query.countOrder } : {}),
    },
  }),
  getAcademicPublicationsYearsQueryRawSchema,
)
