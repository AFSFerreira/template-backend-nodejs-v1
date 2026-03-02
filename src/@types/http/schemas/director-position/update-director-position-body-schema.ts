import type { updateDirectorPositionBodySchema } from '@http/schemas/director-position/update-director-position-body-schema'
import type z from 'zod'

export type UpdateDirectorPositionBodySchemaType = z.infer<typeof updateDirectorPositionBodySchema>
