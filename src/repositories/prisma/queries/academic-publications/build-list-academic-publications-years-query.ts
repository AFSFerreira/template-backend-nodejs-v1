import type { IBuildListAcademicPublicationsYearsQuery } from '@custom-types/repository/prisma/query/academic-publications/get-academic-publications-years'
import { Prisma } from '@prisma/generated/client'
import { evalOffset } from '@utils/generics/eval-offset'

export function buildListAcademicPublicationsYearsQuery(query: IBuildListAcademicPublicationsYearsQuery) {
  const ordinations: Prisma.Sql[] = []

  if (query.orderBy?.countOrder) {
    const countOrder = query.orderBy.countOrder.toUpperCase()
    ordinations.push(Prisma.sql`count ${Prisma.raw(countOrder)}`)
  }

  if (query.orderBy?.yearOrder) {
    const yearOrder = query.orderBy.yearOrder.toUpperCase()
    ordinations.push(Prisma.sql`publication_year ${Prisma.raw(yearOrder)}`)
  }

  if (ordinations.length === 0) {
    ordinations.push(Prisma.sql`publication_year DESC`)
  }

  const orderByClause = Prisma.sql`ORDER BY ${Prisma.join(ordinations, ', ')}`

  const { limit, offset } = evalOffset(query)

  const searchQuery = Prisma.sql`
    SELECT
      publication_year,
      COUNT(*)::int AS count
    FROM academic_publications
    GROUP BY publication_year
    ${orderByClause}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`}
  `

  const countQuery = Prisma.sql`
    SELECT COUNT(DISTINCT publication_year)::int AS total
    FROM academic_publications
  `

  return { searchQuery, countQuery }
}
