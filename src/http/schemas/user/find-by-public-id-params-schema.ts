import { LIMITED_CHARACTERS_SIZE } from '@constants/validation-constants'
import { z } from 'zod'

export const findUserByPublicIdParamsSchema = z.object({
  publicId: z.uuid().max(LIMITED_CHARACTERS_SIZE),
})

export type FindUserByIdParamsSchemaType = z.infer<
  typeof findUserByPublicIdParamsSchema
>
