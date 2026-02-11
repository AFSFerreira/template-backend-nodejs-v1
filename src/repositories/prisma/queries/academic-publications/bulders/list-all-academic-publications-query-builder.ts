import type { IBuildListAllAcademicPublicationsQuery } from '@custom-types/repository/prisma/query/academic-publications/list-all-academic-publications'
import { Prisma } from '@prisma/generated/client'
import { mapComparisonOperation } from '@utils/mappers/map-comparison-operation'

export class ListAllAcademicPublicationsQueryBuilder {
  private conditions: Prisma.Sql[] = []
  private scores: Prisma.Sql[] = []
  private ordinations: Prisma.Sql[] = []

  public withTitleSearch(title?: string): this {
    if (!title) return this

    const searchContent = title.toUpperCase()
    const unaccented = Prisma.sql`unaccent(${searchContent})`
    const tsQuery = Prisma.sql`websearch_to_tsquery('portuguese', ${unaccented})`

    this.conditions.push(
      Prisma.sql`(
        ap.title_unaccent % ${unaccented} OR
        ap.title_tsv_pt @@ ${tsQuery} OR
        ap.title_unaccent ILIKE '%' || ${unaccented} || '%'
      )`,
    )

    this.scores.push(Prisma.sql`similarity(ap.title_unaccent, ${unaccented}) * 0.7`)
    this.scores.push(Prisma.sql`ts_rank(ap.title_tsv_pt, ${tsQuery}) * 0.3`)

    return this
  }

  public withMainCategory(mainCategory?: string): this {
    if (!mainCategory) return this

    this.conditions.push(Prisma.sql`aa.area ILIKE ${mainCategory}`)

    return this
  }

  public withPublicationYear(publicationYear?: IBuildListAllAcademicPublicationsQuery['publicationYear']): this {
    if (!publicationYear) return this

    const op = mapComparisonOperation(publicationYear.publicationYearComparisonOrder)
    const val = publicationYear.year
    this.conditions.push(Prisma.sql`ap.publication_year ${Prisma.raw(op)} ${val}::int`)

    return this
  }

  public withSorting(orderBy?: IBuildListAllAcademicPublicationsQuery['orderBy']): this {
    if (this.scores.length > 0) {
      const scoreExpression = Prisma.sql`(${Prisma.join(this.scores, ' + ')})`
      this.ordinations.unshift(Prisma.sql`${scoreExpression} DESC`)
    }

    if (orderBy?.createdAtOrder) {
      const createdAtOrder = orderBy.createdAtOrder.toUpperCase()
      this.ordinations.push(Prisma.sql`ap.created_at ${Prisma.raw(createdAtOrder)}`)
    }

    this.ordinations.push(Prisma.sql`ap.id ASC`)

    return this
  }

  public build(limit: number, offset: number) {
    const whereClause =
      this.conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(this.conditions, ' AND ')}` : Prisma.empty

    const orderByClause =
      this.ordinations.length > 0 ? Prisma.sql`ORDER BY ${Prisma.join(this.ordinations, ', ')}` : Prisma.empty

    // NOTE: Uso de deferred join para paginar e ordenar
    // primeiro pelos ids e so entao trazer o payload completo.
    const searchQuery = Prisma.sql`
      WITH paginated_publications AS (
        SELECT ap.id
        FROM academic_publications ap
        LEFT JOIN area_of_activity aa ON aa.id = ap.activity_area_id
        ${whereClause}
        GROUP BY ap.id
        ${orderByClause}
        LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`}
      )
      SELECT
        ap.id,
        ap.title,
        ap.journal_name,
        ap.publication_year,
        ap.volume,
        ap.edition_number,
        ap.start_page,
        ap.link_doi,
        ap.created_at,
        ARRAY_AGG(DISTINCT apa.name ORDER BY apa.name) AS authors,
        aa.area AS main_category
      FROM paginated_publications pp
      JOIN academic_publications ap ON ap.id = pp.id
      LEFT JOIN area_of_activity aa ON aa.id = ap.activity_area_id
      LEFT JOIN academic_publication_authors apa ON apa.academic_publication_id = ap.id
      GROUP BY ap.id, aa.area
      ${orderByClause}
    `

    const countQuery = Prisma.sql`
      SELECT COUNT(DISTINCT ap.id)::int AS total
      FROM academic_publications ap
      LEFT JOIN area_of_activity aa ON aa.id = ap.activity_area_id
      ${whereClause}
    `

    return { searchQuery, countQuery }
  }
}
