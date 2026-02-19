import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import z from 'zod'

export const getBlogHtmlContentParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})
