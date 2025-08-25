import { z } from 'zod'

export const findUserByPublicIdParamsSchema = z.object({
  publicId: z.uuid(),
})

export type FindUserByIdParamsSchemaType = z.infer<
  typeof findUserByPublicIdParamsSchema
>
