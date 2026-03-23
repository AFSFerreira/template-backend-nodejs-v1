import type { updateBodySchema } from '@http/schemas/user/update-user-body-schema'
import type z from 'zod'

export type UpdateBodyType = typeof updateBodySchema

export type UpdateUserBodySchemaType = z.infer<UpdateBodyType>
