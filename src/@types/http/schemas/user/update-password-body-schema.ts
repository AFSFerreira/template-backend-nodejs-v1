import type { updatePasswordBodySchema } from '@schemas/user/update-password-body-schema'
import type { z } from 'zod'

export type UpdatePasswordBodySchemaType = z.infer<typeof updatePasswordBodySchema>
