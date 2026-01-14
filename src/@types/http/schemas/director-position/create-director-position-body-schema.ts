import type { createDirectorPositionBodySchema } from '@schemas/director-position/create-director-position-body-schema'
import type z from 'zod'

export type CreateDirectorPositionBodySchemaType = z.infer<typeof createDirectorPositionBodySchema>
