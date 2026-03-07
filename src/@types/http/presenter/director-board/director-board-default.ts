import type { DirectorBoardWithUserRefactored } from '@custom-types/custom/director-board-with-user-refactored'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import z from 'zod'

export interface DirectorBoardDefaultPresenterInput extends DirectorBoardWithUserRefactored {}

export const httpDirectorBoardSchema = z.object({
  id: modelPublicIdSchema,
  profileImage: nonemptyTextSchema,
  publicName: nonemptyTextSchema,
  position: nonemptyTextSchema,
  linkLattes: nullableTextSchema,
})

export type HTTPDirectorBoard = z.infer<typeof httpDirectorBoardSchema>
