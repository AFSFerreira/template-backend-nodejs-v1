import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface AcademicPublicationYearPresenterInput {
  year: number
  count: number
}

const httpAcademicPublicationYearSchema = z.object({
  year: numberSchema,
  count: numberSchema,
})

export type HTTPAcademicPublicationYear = z.infer<typeof httpAcademicPublicationYearSchema>
