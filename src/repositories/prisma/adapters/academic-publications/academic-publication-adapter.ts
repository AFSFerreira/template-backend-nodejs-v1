import type {
  AcademicPublicationSimplifiedRaw,
  CustomAcademicPublicationWithSimplifiedDetails,
} from '@custom-types/repository/prisma/adapter/academic-publication-simplified'

export function academicPublicationAdapter(
  rawPublication: AcademicPublicationSimplifiedRaw,
): CustomAcademicPublicationWithSimplifiedDetails {
  return {
    id: rawPublication.id,
    title: rawPublication.title,
    journalName: rawPublication.journal_name,
    publicationYear: rawPublication.publication_year,
    volume: rawPublication.volume,
    editionNumber: rawPublication.edition_number,
    startPage: rawPublication.start_page,
    linkDoi: rawPublication.link_doi,
    createdAt: rawPublication.created_at,
    authorsName: rawPublication.authors,
    mainCategory: rawPublication.main_category,
  }
}
