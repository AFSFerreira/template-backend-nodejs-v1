import { proseMirrorSchema } from '@schemas/utils/components/blog/prose-mirror-schema'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const updateDirectorBoardBodySchema = z
  .object({
    positionId: modelPublicIdSchema,
    profileImage: nonemptyTextSchema,
    aboutMe: proseMirrorSchema,
    publicName: nonemptyTextSchema,
  })
  .partial()
