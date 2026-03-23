import { modelIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { z } from 'zod'

export const findUserByIdParamsSchema = z.object({
  id: modelIdSchema,
})
