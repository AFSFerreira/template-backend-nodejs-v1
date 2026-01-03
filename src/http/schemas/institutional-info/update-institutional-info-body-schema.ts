import { proseMirrorSchema } from '@schemas/utils/components/blog/prose-mirror-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const updateInstitutionalInfoBodySchema = z
  .object({
    aboutDescription: proseMirrorSchema,
    aboutImage: nonemptyTextSchema,
  })
  .partial()
