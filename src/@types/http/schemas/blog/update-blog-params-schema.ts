import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { z } from 'zod'

export const updateBlogParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})

export type UpdateBlogParamsType = typeof updateBlogParamsSchema

export type UpdateBlogParamsSchemaType = z.infer<UpdateBlogParamsType>
