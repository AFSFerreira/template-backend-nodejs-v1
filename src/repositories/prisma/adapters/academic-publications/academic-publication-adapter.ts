import type { AcademicPublicationRaw } from '@custom-types/academic-publication-raw-type'
import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/custom-academic-publication-with-simplified-details-type'

export function academicPublicationAdapter(
  rawPublication: AcademicPublicationRaw,
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
