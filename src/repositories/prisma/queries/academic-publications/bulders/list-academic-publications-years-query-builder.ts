import type { IBuildListAcademicPublicationsYearsQuery } from '@custom-types/repository/prisma/query/academic-publications/get-academic-publications-years'
import { Prisma } from '@prisma/generated/client'

export class ListAcademicPublicationsYearsQueryBuilder {
  private ordinations: Prisma.Sql[] = []

  public withSorting(orderBy?: IBuildListAcademicPublicationsYearsQuery['orderBy']): this {
    if (orderBy?.countOrder) {
      const countOrder = orderBy.countOrder.toUpperCase()
      this.ordinations.push(Prisma.sql`count ${Prisma.raw(countOrder)}`)
    }

    if (orderBy?.yearOrder) {
      const yearOrder = orderBy.yearOrder.toUpperCase()
      this.ordinations.push(Prisma.sql`publication_year ${Prisma.raw(yearOrder)}`)
    }

    if (this.ordinations.length === 0) {
      this.ordinations.push(Prisma.sql`publication_year DESC`)
    }

    return this
  }

  public build(limit: number, offset: number) {
    const orderByClause = Prisma.sql`ORDER BY ${Prisma.join(this.ordinations, ', ')}`

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
}
