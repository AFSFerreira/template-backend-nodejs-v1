import { z } from 'zod'

export const findUserByPublicIdParamsSchema = z.object({
  publicId: z.string().uuid(),
})

export type FindUserByIdSchemaType = z.infer<typeof findUserByPublicIdParamsSchema>
