import { z } from 'zod'

export const findUserByPublicIdParamsSchema = z.object({
  publicId: z.string().uuid().trim().nonempty(),
})

export type FindUserByIdSchemaType = z.infer<
  typeof findUserByPublicIdParamsSchema
>
