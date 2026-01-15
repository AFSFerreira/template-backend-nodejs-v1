import type { createDirectorBoardBodySchema } from '@schemas/director-board/create-director-board-body-schema'
import type z from 'zod'

export type CreateDirectorBoardBodySchemaType = z.infer<typeof createDirectorBoardBodySchema>
