import type { updateDirectorPositionParamsSchema } from '@http/schemas/director-position/update-director-position-params-schema'
import type z from 'zod'

export type UpdateDirectorPositionParamsType = typeof updateDirectorPositionParamsSchema

export type UpdateDirectorPositionParamsSchemaType = z.infer<UpdateDirectorPositionParamsType>
