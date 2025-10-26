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
