import type { DirectorBoardWithUserRefactored } from '@custom-types/custom/director-board-with-user-refactored'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import z from 'zod'

export interface DirectorBoardWithUserPresenterInput extends DirectorBoardWithUserRefactored {}

export const httpDirectorBoardWithUserSchema = z.object({
  id: modelPublicIdSchema,
  publicName: nonemptyTextSchema,
  profileImage: nonemptyTextSchema,
  position: nonemptyTextSchema,
  linkLattes: nullableTextSchema,
})

export type HTTPDirectorBoardWithUser = z.infer<typeof httpDirectorBoardWithUserSchema>
