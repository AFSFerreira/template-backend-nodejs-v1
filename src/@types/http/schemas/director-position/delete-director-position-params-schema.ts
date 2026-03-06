import type { deleteDirectorPositionParamsSchema } from '@http/schemas/director-position/delete-director-position-params-schema'
import type z from 'zod'

export type DeleteDirectorPositionParamsType = typeof deleteDirectorPositionParamsSchema

export type DeleteDirectorPositionParamsSchemaType = z.infer<DeleteDirectorPositionParamsType>
