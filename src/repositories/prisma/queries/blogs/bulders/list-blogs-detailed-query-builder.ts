import type { IBuildGetAllBlogsDetailedQuerySchemaType } from '@custom-types/repository/prisma/query/blogs/blog-detailed'
import { ActivityAreaType, EditorialStatusType, Prisma } from '@prisma/generated/client'

export class ListBlogsDetailedQueryBuilder {
  private conditions: Prisma.Sql[] = [
    Prisma.sql`b.editorial_status != ${EditorialStatusType.DRAFT}::"EditorialStatusType"`,
  ]

  private scores: Prisma.Sql[] = []
  private ordinations: Prisma.Sql[] = []
  private subcategoriesUnique: string[] = []
  private subCatCount = 0

  public withTextSearch(searchContent?: string): this {
    if (!searchContent) return this

    const content = searchContent.toUpperCase()
    const unaccented = Prisma.sql`unaccent(${content})`
    const tsQuery = Prisma.sql`websearch_to_tsquery('portuguese', ${unaccented})`

    this.conditions.push(
      Prisma.sql`(
        b.title_unaccent % ${unaccented} OR
        b.search_tsv_pt @@ ${tsQuery} OR
        b.title_unaccent ILIKE '%' || ${unaccented} || '%'
      )`,
    )

    this.scores.push(Prisma.sql`similarity(b.title_unaccent, ${unaccented}) * 0.75`)
    this.scores.push(Prisma.sql`ts_rank(b.search_tsv_pt, ${tsQuery}) * 0.25`)

    return this
  }

  public withAuthor(authorId?: string): this {
    if (!authorId) return this

    this.conditions.push(Prisma.sql`u.public_id = ${authorId}`)

    return this
  }

  public withEditorialStatus(editorialStatus?: string): this {
    if (!editorialStatus) return this

    this.conditions.push(Prisma.sql`b.editorial_status = ${editorialStatus}::"EditorialStatusType"`)

    return this
  }

  public withSubcategories(subcategories?: string[]): this {
    if (!subcategories?.length) return this

    this.subcategoriesUnique = Array.from(new Set(subcategories))
    this.subCatCount = this.subcategoriesUnique.length

    return this
  }

  public withSorting(orderBy?: IBuildGetAllBlogsDetailedQuerySchemaType['orderBy']): this {
    if (this.scores.length > 0) {
      const scoreExpression = Prisma.sql`(${Prisma.join(this.scores, ' + ')})`
      this.ordinations.push(Prisma.sql`${scoreExpression} DESC`)
    }

    if (orderBy?.accessCountOrder) {
      this.ordinations.push(Prisma.sql`b.access_count ${Prisma.raw(orderBy.accessCountOrder.toUpperCase())}`)
    }

    if (orderBy?.createdAtOrder) {
      this.ordinations.push(Prisma.sql`b.created_at ${Prisma.raw(orderBy.createdAtOrder.toUpperCase())}`)
    }

    this.ordinations.push(Prisma.sql`b.id ASC`)

    return this
  }

  public build(limit: number, offset: number) {
    const whereClause =
      this.conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(this.conditions, ' AND ')}` : Prisma.empty

    const orderByClause =
      this.ordinations.length > 0 ? Prisma.sql`ORDER BY ${Prisma.join(this.ordinations, ', ')}` : Prisma.empty

    const havingClause =
      this.subCatCount > 0
        ? Prisma.sql`HAVING COUNT(DISTINCT sc.area) FILTER (WHERE sc.area = ANY(${this.subcategoriesUnique}::text[])) = ${this.subCatCount}`
        : Prisma.empty

    // NOTE: Uso de deferred join para paginar e ordenar
    // primeiro pelos ids e so entao trazer o payload completo.
    const searchQuery = Prisma.sql`
      WITH paginated_blogs AS (
        SELECT b.id
        FROM blogs b
        LEFT JOIN users u ON u.id = b.user_id
        LEFT JOIN "_ActivityAreaToBlog" bs ON bs."B" = b.id
        LEFT JOIN area_of_activity sc ON sc.id = bs."A" AND sc.type = ${ActivityAreaType.SUB_AREA_OF_ACTIVITY}::"ActivityAreaType"
        ${whereClause}
        GROUP BY b.id
        ${havingClause}
        ${orderByClause}
        LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`}
      )
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
      FROM paginated_blogs pb
      JOIN blogs b ON b.id = pb.id
      LEFT JOIN users u ON u.id = b.user_id
      LEFT JOIN "_ActivityAreaToBlog" bs ON bs."B" = b.id
      LEFT JOIN area_of_activity sc ON sc.id = bs."A" AND sc.type = ${ActivityAreaType.SUB_AREA_OF_ACTIVITY}::"ActivityAreaType"
      GROUP BY b.id, u.full_name
      ${orderByClause}
    `

    const countQuery = Prisma.sql`
      SELECT COUNT(*)::int AS total FROM (
        SELECT b.id
        FROM blogs b
        LEFT JOIN users u ON u.id = b.user_id
        LEFT JOIN "_ActivityAreaToBlog" bs ON bs."B" = b.id
        LEFT JOIN area_of_activity sc ON sc.id = bs."A" AND sc.type = ${ActivityAreaType.SUB_AREA_OF_ACTIVITY}::"ActivityAreaType"
        ${whereClause}
        GROUP BY b.id
        ${havingClause}
      ) AS t
    `

    return { searchQuery, countQuery }
  }
}
