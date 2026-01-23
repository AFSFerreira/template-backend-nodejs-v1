import type { IBuildGetAllBlogsDetailedQuerySchemaType } from '@custom-types/repository/prisma/query/blogs/blog-detailed'
import { ActivityAreaType, EditorialStatusType, Prisma } from '@prisma/client'
import { evalOffset } from '@utils/generics/eval-offset'

export function buildListAllBlogsDetailedQuery(query: IBuildGetAllBlogsDetailedQuerySchemaType) {
  const conditions: Prisma.Sql[] = [
    Prisma.sql`b.editorial_status != ${EditorialStatusType.DRAFT}::"EditorialStatusType"`,
  ]

  const scores: Prisma.Sql[] = []
  const ordinations: Prisma.Sql[] = []

  if (query.searchContent) {
    const searchContent = query.searchContent.toUpperCase()

    const unaccentedSearchContent = Prisma.sql`unaccent(${searchContent})`

    const tsQuery = Prisma.sql`websearch_to_tsquery('portuguese', ${unaccentedSearchContent})`

    conditions.push(
      Prisma.sql`(
        b.title_unaccent % ${unaccentedSearchContent} OR
        b.search_tsv_pt @@ ${tsQuery} OR
        b.title_unaccent ILIKE '%' || ${unaccentedSearchContent} || '%'
      )`,
    )

    scores.push(Prisma.sql`similarity(b.title_unaccent, ${unaccentedSearchContent}) * 0.75`)
    scores.push(Prisma.sql`ts_rank(b.search_tsv_pt, ${tsQuery}) * 0.25`)
  }

  if (query.authorId) {
    conditions.push(Prisma.sql`u.public_id = ${query.authorId}`)
  }

  if (query.editorialStatus) {
    conditions.push(Prisma.sql`b.editorial_status = ${query.editorialStatus}::"EditorialStatusType"`)
  }

  const { limit, offset } = evalOffset(query)
  const whereClause = conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty

  if (scores.length > 0) {
    const scoreExpression = Prisma.sql`(${Prisma.join(scores, ' + ')})`
    ordinations.push(Prisma.sql`${scoreExpression} DESC`)
  }

  if (query.orderBy) {
    if (query.orderBy.accessCountOrder) {
      ordinations.push(Prisma.sql`b.access_count ${Prisma.raw(query.orderBy.accessCountOrder.toUpperCase())}`)
    }

    if (query.orderBy.createdAtOrder) {
      ordinations.push(Prisma.sql`b.created_at ${Prisma.raw(query.orderBy.createdAtOrder.toUpperCase())}`)
    }
  }

  ordinations.push(Prisma.sql`b.id ASC`)

  const orderByClause = Prisma.sql`ORDER BY ${Prisma.join(ordinations, ', ')}`

  const subCategories = query.subCategories ?? []
  const subCategoriesUnique = Array.from(new Set(subCategories))
  const subCatCount = subCategoriesUnique.length

  const havingClause =
    subCatCount > 0
      ? Prisma.sql`HAVING COUNT(DISTINCT sc.area) FILTER (WHERE sc.area = ANY(${subCategoriesUnique}::text[])) = ${subCatCount}`
      : Prisma.empty

  const searchQuery = Prisma.sql`
    SELECT
      b.id,
      b.public_id,
      b.banner_image,
      b.editorial_status,
      b.author_name,
      b.title,
      b.access_count,
      b.search_content,
      b.created_at,
      b.updated_at,
      u.full_name as user_full_name,
      COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'id', sc.id,
            'area', sc.area
          )
        ) FILTER (WHERE sc.id IS NOT NULL),
        '[]'
      ) AS subcategories
    FROM blogs b
    LEFT JOIN users u ON u.id = b.user_id
    LEFT JOIN _ActivityAreaToBlog bs ON bs."B" = b.id
    LEFT JOIN area_of_activity sc ON sc.id = bs."A" AND sc.type = ${ActivityAreaType.SUB_AREA_OF_ACTIVITY}::"ActivityAreaType"
    ${whereClause}
    GROUP BY b.id, u.full_name
    ${havingClause}
    ${orderByClause}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`}
  `

  const countQuery = Prisma.sql`
    SELECT COUNT(*)::int AS total FROM (
      SELECT b.id
      FROM blogs b
      LEFT JOIN users u ON u.id = b.user_id
      LEFT JOIN _ActivityAreaToBlog bs ON bs."B" = b.id
      LEFT JOIN area_of_activity sc ON sc.id = bs."A" AND sc.type = ${ActivityAreaType.SUB_AREA_OF_ACTIVITY}::"ActivityAreaType"
      ${whereClause}
      GROUP BY b.id
      ${havingClause}
    ) AS t;
  `

  return { searchQuery, countQuery }
}
