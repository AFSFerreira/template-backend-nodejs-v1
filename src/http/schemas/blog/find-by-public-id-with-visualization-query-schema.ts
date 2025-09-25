import { uuidv7Schema } from '@schemas/utils/primitives/uuidv7-schema'
import z from 'zod'

export const findByPublicIdWithVisualizationParamsSchema = z.object({
  publicId: uuidv7Schema,
})

export type FindByPublicIdWithVisualizationParamsSchemaType = z.infer<
  typeof findByPublicIdWithVisualizationParamsSchema
>
