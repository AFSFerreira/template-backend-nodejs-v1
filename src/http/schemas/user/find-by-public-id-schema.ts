import { z } from 'zod'
import { nonemptyTextSchema } from '../utils/nonempty-text'

export const findUserByPublicIdParamsSchema = z.object({
  publicId: nonemptyTextSchema.uuid(),
})

export type FindUserByIdSchemaType = z.infer<
  typeof findUserByPublicIdParamsSchema
>
