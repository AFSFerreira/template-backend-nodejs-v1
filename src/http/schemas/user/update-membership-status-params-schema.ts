import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import z from 'zod'

export const updateMembershipStatusParamsSchema = z.object({
  publicId: modelPublicIdSchema,
})
