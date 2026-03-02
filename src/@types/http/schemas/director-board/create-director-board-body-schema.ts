import type { createDirectorBoardBodySchema } from '@http/schemas/director-board/create-director-board-body-schema'
import type z from 'zod'

export type CreateDirectorBoardBodySchemaType = z.infer<typeof createDirectorBoardBodySchema>
