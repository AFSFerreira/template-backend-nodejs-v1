import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'
import { proseMirrorSchema } from '../utils/components/blog/prose-mirror-schema'

export const createDirectorBoardBodySchema = z.object({
  userId: modelPublicIdSchema,
  positionId: modelPublicIdSchema,
  profileImage: nonemptyTextSchema.optional(),
  aboutMe: proseMirrorSchema,
  publicName: nonemptyTextSchema,
})
