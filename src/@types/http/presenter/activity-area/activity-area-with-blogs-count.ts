import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface ActivityAreaWithBlogsCountPresenterInput {
  area: string
  blogsCount: number
}

export const httpActivityAreaWithBlogsCountSchema = z.object({
  area: nonemptyTextSchema,
  blogsCount: numberSchema,
})

export type HTTPActivityAreaWithBlogsCount = z.infer<typeof httpActivityAreaWithBlogsCountSchema>
