import type { updateDirectorBoardParamsSchema } from '@http/schemas/director-board/update-director-board-params-schema'
import type z from 'zod'

export type UpdateDirectorBoardParamsType = typeof updateDirectorBoardParamsSchema

export type UpdateDirectorBoardParamsSchemaType = z.infer<UpdateDirectorBoardParamsType>
