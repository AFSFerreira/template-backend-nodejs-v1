import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const deleteBlogImageParamsSchema = z.object({
  fileName: nonemptyTextSchema,
})
