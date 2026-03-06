import type { createDirectorBoardBodySchema } from '@http/schemas/director-board/create-director-board-body-schema'
import type z from 'zod'

export type CreateDirectorBoardBodyType = typeof createDirectorBoardBodySchema

export type CreateDirectorBoardBodySchemaType = z.infer<CreateDirectorBoardBodyType>
