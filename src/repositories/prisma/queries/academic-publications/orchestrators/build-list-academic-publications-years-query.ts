import type { IBuildListAcademicPublicationsYearsQuery } from '@custom-types/repository/prisma/query/academic-publications/get-academic-publications-years'
import { evalOffset } from '@utils/generics/eval-offset'
import { ListAcademicPublicationsYearsQueryBuilder } from '../bulders/list-academic-publications-years-query-builder'

export function buildListAcademicPublicationsYearsQuery(query: IBuildListAcademicPublicationsYearsQuery) {
  const { limit, offset } = evalOffset(query)

  const builder = new ListAcademicPublicationsYearsQueryBuilder().withSorting(query.orderBy)

  return builder.build(limit, offset)
}
