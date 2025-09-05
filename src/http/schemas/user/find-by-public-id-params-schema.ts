import { uuidv7Schema } from '@schemas/utils/primitives/uuidv7-schema'
import { z } from 'zod'

export const findUserByPublicIdParamsSchema = z.object({
  publicId: uuidv7Schema,
})

export type FindUserByIdParamsSchemaType = z.infer<
  typeof findUserByPublicIdParamsSchema
>
