import type {
  AcademicPublicationYearRaw,
  CustomAcademicPublicationYear,
} from '@custom-types/repository/prisma/adapter/academic-publication-year'

export function academicPublicationYearAdapter(rawYear: AcademicPublicationYearRaw): CustomAcademicPublicationYear {
  return {
    year: rawYear.publication_year,
    count: rawYear.count,
  }
}
