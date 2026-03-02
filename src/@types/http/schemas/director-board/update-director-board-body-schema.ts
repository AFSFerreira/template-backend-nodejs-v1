import type { updateDirectorBoardBodySchema } from '@http/schemas/director-board/update-director-board-body-schema'
import type z from 'zod'

export type UpdateDirectorBoardBodySchemaType = z.infer<typeof updateDirectorBoardBodySchema>
