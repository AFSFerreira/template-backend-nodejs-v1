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

export interface CustomAcademicPublicationWithSimplifiedDetails {
  id: number
  title: string
  journalName: string
  publicationYear: number
  volume: string
  editionNumber: string
  startPage: string
  linkDoi: string
  createdAt: Date
  authorsName: string[]
  mainCategory: string
}
