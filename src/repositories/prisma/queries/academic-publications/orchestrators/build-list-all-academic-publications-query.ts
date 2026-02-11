import type { IBuildListAllAcademicPublicationsQuery } from '@custom-types/repository/prisma/query/academic-publications/list-all-academic-publications'
import { evalOffset } from '@utils/generics/eval-offset'
import { ListAllAcademicPublicationsQueryBuilder } from '../bulders/list-all-academic-publications-query-builder'

export function buildListAllAcademicPublicationsQuery(query: IBuildListAllAcademicPublicationsQuery) {
  const { limit, offset } = evalOffset(query)

  const builder = new ListAllAcademicPublicationsQueryBuilder()
    .withTitleSearch(query.title)
    .withMainCategory(query.mainCategory)
    .withPublicationYear(query.publicationYear)
    .withSorting(query.orderBy)

  return builder.build(limit, offset)
}
