import { ActivityAreaType } from '@prisma/client'
import { paginatedSchema } from '@schemas/utils/paginated-schema'
import z from 'zod'
import { upperCaseTextSchema } from '../utils/uppercase-text-schema'

export const getAllActivityAreasSchema = z
  .object({
    name: upperCaseTextSchema.optional(),
    type: z.enum(ActivityAreaType).optional(),
  })
  .extend(paginatedSchema.shape)

export type getAllActivityAreasSchemaType = z.infer<
  typeof getAllActivityAreasSchema
>
