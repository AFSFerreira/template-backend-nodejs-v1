import type { findDirectorBoardByPublicIdForAdminParamsSchema } from '@http/schemas/director-board/find-director-board-by-public-id-for-admin-params-schema'
import type z from 'zod'

export type FindDirectorBoardByPublicIdForAdminParamsType = typeof findDirectorBoardByPublicIdForAdminParamsSchema

export type FindDirectorBoardByPublicIdForAdminParamsSchemaType = z.infer<FindDirectorBoardByPublicIdForAdminParamsType>
