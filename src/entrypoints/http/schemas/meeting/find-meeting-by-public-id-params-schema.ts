import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import z from 'zod'

export const findMeetingByPublicIdParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})
