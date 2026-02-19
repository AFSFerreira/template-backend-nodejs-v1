import { integerSchema } from '@lib/zod/utils/primitives/integer-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const subcategorySchema = z.object({
  id: integerSchema,
  area: nonemptyTextSchema,
})
