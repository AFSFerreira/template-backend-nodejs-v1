import { z } from 'zod'

export const findUserByPublicIdParamsSchema = z.object({
  publicId: z.uuid(),
})

export type FindUserByIdSchemaType = z.infer<
  typeof findUserByPublicIdParamsSchema
>
