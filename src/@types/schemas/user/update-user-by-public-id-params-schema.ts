import type { updateUserByPublicIdParamsSchema } from '@schemas/user/update-user-by-public-id-params-schema'
import type z from 'zod'

export type UpdateUserByPublicIdParamsSchemaType = z.infer<typeof updateUserByPublicIdParamsSchema>
