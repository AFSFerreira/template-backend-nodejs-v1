import type { academicPublicationYearAdapterSchema } from '@repositories/prisma/adapters/academic-publications/academic-publication-year-adapter-schema'
import type z from 'zod'

export interface AcademicPublicationYearRaw {
  publication_year: number
  count: number
}

export type CustomAcademicPublicationYear = z.infer<typeof academicPublicationYearAdapterSchema>
