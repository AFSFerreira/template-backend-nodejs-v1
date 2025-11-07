import { uuidv7Schema } from '@schemas/utils/primitives/uuidv7-schema'
import z from 'zod'

export const getBlogHtmlContentParamsSchema = z.object({
  publicId: uuidv7Schema,
})

export type GetBlogHtmlContentParamsSchemaType = z.infer<typeof getBlogHtmlContentParamsSchema>
