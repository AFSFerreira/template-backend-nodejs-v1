import type { changePasswordBodySchema } from '@http/schemas/user/update-password-body-schema'
import type { z } from 'zod'

export type UpdatePasswordBodyType = typeof changePasswordBodySchema

export type UpdatePasswordBodySchemaType = z.infer<UpdatePasswordBodyType>
