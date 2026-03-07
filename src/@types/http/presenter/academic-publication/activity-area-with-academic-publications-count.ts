import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface ActivityAreaWithAcademicPublicationsCountPresenterInput {
  area: string
  publicationsCount: number
}

const httpActivityAreaWithAcademicPublicationsCountSchema = z.object({
  area: nonemptyTextSchema,
  publicationsCount: numberSchema,
})

export type HTTPActivityAreaWithAcademicPublicationsCount = z.infer<
  typeof httpActivityAreaWithAcademicPublicationsCountSchema
>
