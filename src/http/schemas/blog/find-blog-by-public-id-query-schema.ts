import { uuidv7Schema } from '@schemas/utils/primitives/uuidv7-schema'
import z from 'zod'

export const findBlogByPublicIdParamsSchema = z.object({
  publicId: uuidv7Schema,
})

export type findBlogByPublicIdParamsSchemaType = z.infer<
  typeof findBlogByPublicIdParamsSchema
>
