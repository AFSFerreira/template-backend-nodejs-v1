import type { getAllDirectorPositionsSchema } from '@http/schemas/director-position/get-all-director-positions-schema'
import type z from 'zod'

export type GetAllDirectorPositionsSchemaType = z.infer<typeof getAllDirectorPositionsSchema>
