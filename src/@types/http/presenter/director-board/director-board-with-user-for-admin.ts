import type { DirectorBoardWithUserRefactored } from '@custom-types/custom/director-board-with-user-refactored'
import { proseMirrorSchema } from '@http/schemas/utils/components/blog/prose-mirror-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import z from 'zod'

export interface DirectorBoardWithUserForAdminPresenterInput extends DirectorBoardWithUserRefactored {}

const httpDirectorBoardWithUserForAdminSchema = z.object({
  id: modelPublicIdSchema,
  publicName: nonemptyTextSchema,
  profileImage: nonemptyTextSchema,
  position: nonemptyTextSchema,
  linkLattes: nullableTextSchema,
  aboutMe: proseMirrorSchema,
})

export type HTTPDirectorBoardWithUserForAdmin = z.infer<typeof httpDirectorBoardWithUserForAdminSchema>
