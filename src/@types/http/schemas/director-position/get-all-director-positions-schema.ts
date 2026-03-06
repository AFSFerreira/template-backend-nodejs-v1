import type { getAllDirectorPositionsSchema } from '@http/schemas/director-position/get-all-director-positions-schema'
import type z from 'zod'

export type GetAllDirectorPositionsType = typeof getAllDirectorPositionsSchema

export type GetAllDirectorPositionsSchemaType = z.infer<GetAllDirectorPositionsType>
