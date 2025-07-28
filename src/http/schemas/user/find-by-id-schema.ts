import { z } from 'zod'

export const findUserByIdParamsSchema = z.object({
  userId: z.string().uuid(),
})

export type FindUserByIdSchemaType = z.infer<typeof findUserByIdParamsSchema>
