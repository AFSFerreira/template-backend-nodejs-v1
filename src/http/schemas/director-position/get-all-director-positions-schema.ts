import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllDirectorPositionsSchema = z
  .object({
    position: nonemptyTextSchema,
  })
  .partial()
  .extend(paginatedSchema.shape)
