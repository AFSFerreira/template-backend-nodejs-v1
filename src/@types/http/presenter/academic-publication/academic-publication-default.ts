import type { AcademicPublicationWithDetails } from '@custom-types/validators/academic-publication-with-details'

export interface AcademicPublicationDefaultPresenterInput extends AcademicPublicationWithDetails {}

export interface HTTPAcademicPublication {
  title: string
  journalName: string
  publicationYear: number
  volume: string
  editionNumber: string
  startPage: string
  linkDoi: string
  mainCategory: string
  authorsNames: string[]
}
