import type { updateDirectorBoardBodySchema } from '@http/schemas/director-board/update-director-board-body-schema'
import type z from 'zod'

export type UpdateDirectorBoardBodyType = typeof updateDirectorBoardBodySchema

export type UpdateDirectorBoardBodySchemaType = z.infer<UpdateDirectorBoardBodyType>
