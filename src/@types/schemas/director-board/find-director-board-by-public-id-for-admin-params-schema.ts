import type { findDirectorBoardByPublicIdForAdminParamsSchema } from '@schemas/director-board/find-director-board-by-public-id-for-admin-params-schema'
import type z from 'zod'

export type FindDirectorBoardByPublicIdForAdminParamsSchemaType = z.infer<
  typeof findDirectorBoardByPublicIdForAdminParamsSchema
>
