import type { deleteDirectorBoardParamsSchema } from '@http/schemas/director-board/delete-director-board-params-schema'
import type z from 'zod'

export type DeleteDirectorBoardParamsType = typeof deleteDirectorBoardParamsSchema

export type DeleteDirectorBoardParamsSchemaType = z.infer<DeleteDirectorBoardParamsType>
