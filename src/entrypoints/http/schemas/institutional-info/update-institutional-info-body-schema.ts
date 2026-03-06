import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'
import { proseMirrorSchema } from '../utils/components/blog/prose-mirror-schema'

export const updateInstitutionalInfoBodySchema = z
  .object({
    aboutDescription: proseMirrorSchema,
    aboutImage: nonemptyTextSchema,
  })
  .partial()
