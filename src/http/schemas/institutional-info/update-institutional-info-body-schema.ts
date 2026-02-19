import { proseMirrorSchema } from '@lib/zod/utils/components/blog/prose-mirror-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const updateInstitutionalInfoBodySchema = z
  .object({
    aboutDescription: proseMirrorSchema,
    aboutImage: nonemptyTextSchema,
  })
  .partial()
