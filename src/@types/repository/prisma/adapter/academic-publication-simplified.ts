import type { academicPublicationAdapterSchema } from '@repositories/prisma/adapters/academic-publications/academic-publication-adapter-schema'
import type z from 'zod'

export interface AcademicPublicationSimplifiedRaw {
  id: number
  title: string
  journal_name: string
  publication_year: number
  volume: string
  edition_number: string
  start_page: string
  link_doi: string
  created_at: Date
  authors: string[]
  main_category: string
}

export type CustomAcademicPublicationWithSimplifiedDetails = z.infer<typeof academicPublicationAdapterSchema>
