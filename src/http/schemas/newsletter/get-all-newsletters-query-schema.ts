import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllNewslettersQueryRawSchema = z
  .object({
    sequenceNumber: nonemptyTextSchema,
    editionNumber: nonemptyTextSchema,
    volume: nonemptyTextSchema,
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsEnumSchema.default('desc'),
        sequenceNumberOrder: orderDirectionsEnumSchema.default('desc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllNewslettersQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.createdAtOrder ? { createdAtOrder: query.createdAtOrder } : {}),
      ...(query.sequenceNumberOrder ? { sequenceNumberOrder: query.sequenceNumberOrder } : {}),
    },
  }),
  getAllNewslettersQueryRawSchema,
)
