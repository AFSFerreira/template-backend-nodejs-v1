import type { getAllDirectorBoardSchema } from '@http/schemas/director-board/get-all-director-board-query-schema'
import type z from 'zod'

export type GetAllDirectorBoardSchemaType = z.infer<typeof getAllDirectorBoardSchema>
