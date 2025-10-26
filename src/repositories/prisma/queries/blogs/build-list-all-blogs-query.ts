import { ActivityAreaType, Prisma } from '@prisma/client'
import type { GetAllPostsQuerySchemaType } from '@schemas/blog/get-all-posts-query-schema'
import { evalOffset } from '@utils/eval-offset'

export function buildListAllBlogsQuery(query: GetAllPostsQuerySchemaType) {
  const conditions: Prisma.Sql[] = []
  const scores: Prisma.Sql[] = []
  const ordinations: Prisma.Sql[] = []

  if (query.searchContent) {
    const searchContent = query.searchContent.toUpperCase()

    const unaccentedSearchContent = Prisma.sql`unaccent(${searchContent})`

    const tsQuery = Prisma.sql`plainto_tsquery('portuguese', ${unaccentedSearchContent})`

    conditions.push(
      Prisma.sql`(
        b.title_unaccent % ${unaccentedSearchContent} OR
        b.title_unaccent ILIKE unaccent(${`%${searchContent}%`}) OR
        b.search_tsv_pt @@ ${tsQuery}
      )`,
    )

    scores.push(Prisma.sql`similarity(b.title_unaccent, ${unaccentedSearchContent}) * 0.75`)
    scores.push(Prisma.sql`ts_rank(b.search_tsv_pt, ${tsQuery}) * 0.25`)
  }

  if (query.authorId) {
    conditions.push(Prisma.sql`u.public_id = ${query.authorId}`)
  }

  if (query.mainCategory) {
    conditions.push(Prisma.sql`mc.area ILIKE ${query.mainCategory}`)
  }

  const scoreExpression = scores.length > 0 ? Prisma.sql`(${Prisma.join(scores, ' + ')})` : Prisma.sql`0`

  const { limit, offset } = evalOffset(query)
  const whereClause = conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty

  if (scores.length > 0) {
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
      b.title,
      b.access_count,
      b.search_content,
      b.created_at,
      b.updated_at
    FROM blogs b
    LEFT JOIN users u ON u.id = b.user_id
    LEFT JOIN area_of_activity mc ON mc.id = b.main_blog_category_id
    LEFT JOIN _blog_subcategories bs ON bs."B" = b.id
    LEFT JOIN area_of_activity sc ON sc.id = bs."A" AND sc.type = ${ActivityAreaType.SUB_AREA_OF_ACTIVITY}::"ActivityAreaType"
    ${whereClause}
    GROUP BY b.id
    ${havingClause}
    ${orderByClause}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`}
  `

  const countQuery = Prisma.sql`
    SELECT COUNT(*)::int AS total FROM (
      SELECT b.id
      FROM blogs b
      LEFT JOIN users u ON u.id = b.user_id
      LEFT JOIN area_of_activity mc ON mc.id = b.main_blog_category_id
      LEFT JOIN _blog_subcategories bs ON bs."B" = b.id
      LEFT JOIN area_of_activity sc ON sc.id = bs."A" AND sc.type = ${ActivityAreaType.SUB_AREA_OF_ACTIVITY}::"ActivityAreaType"
      ${whereClause}
      GROUP BY b.id
      ${havingClause}
    ) AS t;
  `

  return { searchQuery, countQuery }
}
