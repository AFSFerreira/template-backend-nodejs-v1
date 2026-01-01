import type { IBuildListAllAcademicPublicationsQuery } from '@custom-types/query/academic-publications/list-all-academic-publications'
import { Prisma } from '@prisma/client'
import { evalOffset } from '@utils/generics/eval-offset'
import { mapComparisonOperation } from '@utils/mappers/map-comparison-operation'

export function buildListAllAcademicPublicationsQuery(query: IBuildListAllAcademicPublicationsQuery) {
  const conditions: Prisma.Sql[] = []
  const ordinations: Prisma.Sql[] = []
  const scores: Prisma.Sql[] = []

  if (query.title) {
    const title = query.title.toUpperCase()
    const unaccentedSearchContent = Prisma.sql`unaccent(${title})`
    const tsQuery = Prisma.sql`websearch_to_tsquery('portuguese', ${unaccentedSearchContent})`

    conditions.push(
      Prisma.sql`(
        ap.title_unaccent % ${unaccentedSearchContent} OR
        ap.title_tsv_pt @@ ${tsQuery} OR
        ap.title_unaccent ILIKE '%' || ${unaccentedSearchContent} || '%'
      )`,
    )

    scores.push(Prisma.sql`similarity(ap.title_unaccent, ${unaccentedSearchContent}) * 0.7`)
    scores.push(Prisma.sql`ts_rank(ap.title_tsv_pt, ${tsQuery}) * 0.3`)
  }

  if (query.mainCategory) {
    conditions.push(Prisma.sql`aa.area ILIKE ${query.mainCategory}`)
  }

  if (query.publicationYear) {
    const op = mapComparisonOperation(query.publicationYear.publicationYearComparisonOrder)
    const val = query.publicationYear.year
    conditions.push(Prisma.sql`ap.publication_year ${Prisma.raw(op)} ${val}::int`)
  }

  const whereClause = conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty

  const { limit, offset } = evalOffset(query)

  if (scores.length > 0) {
    const scoreExpression = Prisma.sql`(${Prisma.join(scores, ' + ')})`
    ordinations.unshift(Prisma.sql`${scoreExpression} DESC`)
  }

  if (query.orderBy) {
    if (query.orderBy.createdAtOrder) {
      const createdAtOrder = query.orderBy.createdAtOrder.toUpperCase()
      ordinations.push(Prisma.sql`ap.created_at ${Prisma.raw(createdAtOrder)}`)
    }
  }

  ordinations.push(Prisma.sql`ap.id ASC`)

  const orderByClause = Prisma.sql`ORDER BY ${Prisma.join(ordinations, ', ')}`

  const searchQuery = Prisma.sql`
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
    FROM academic_publications ap
    LEFT JOIN area_of_activity aa ON aa.id = ap.activity_area_id
    LEFT JOIN academic_publication_authors apa ON apa.academic_publication_id = ap.id
    ${whereClause}
    GROUP BY ap.id, aa.area
    ${orderByClause}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`}
  `

  const countQuery = Prisma.sql`
    SELECT COUNT(DISTINCT ap.id)::int AS total
    FROM academic_publications ap
    LEFT JOIN area_of_activity aa ON aa.id = ap.activity_area_id
    LEFT JOIN academic_publication_authors apa ON apa.academic_publication_id = ap.id
    ${whereClause}
  `

  return { searchQuery, countQuery }
}
