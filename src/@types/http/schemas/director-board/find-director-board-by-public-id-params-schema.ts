import type { findDirectorBoardByPublicIdParamsSchema } from '@http/schemas/director-board/find-director-board-by-public-id-params-schema'
import type z from 'zod'

export type FindDirectorBoardByPublicIdParamsType = typeof findDirectorBoardByPublicIdParamsSchema

export type FindDirectorBoardByPublicIdParamsSchemaType = z.infer<FindDirectorBoardByPublicIdParamsType>
