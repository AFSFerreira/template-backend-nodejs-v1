import type { createDirectorPositionBodySchema } from '@http/schemas/director-position/create-director-position-body-schema'
import type z from 'zod'

export type CreateDirectorPositionBodySchemaType = z.infer<typeof createDirectorPositionBodySchema>
