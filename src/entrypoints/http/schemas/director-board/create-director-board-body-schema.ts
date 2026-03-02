import { proseMirrorSchema } from '@lib/zod/utils/components/blog/prose-mirror-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const createDirectorBoardBodySchema = z.object({
  userId: modelPublicIdSchema,
  positionId: modelPublicIdSchema,
  profileImage: nonemptyTextSchema.optional(),
  aboutMe: proseMirrorSchema,
  publicName: nonemptyTextSchema,
})
