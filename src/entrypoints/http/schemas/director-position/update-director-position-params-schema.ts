import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import z from 'zod'

export const updateDirectorPositionParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})
