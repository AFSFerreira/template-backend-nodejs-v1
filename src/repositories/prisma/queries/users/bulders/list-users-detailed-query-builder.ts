import type { IBuildListAllUsersDetailedQuery } from '@custom-types/repository/prisma/query/users/user-detailed'
import { Prisma } from '@prisma/generated/client'

export class ListUsersDetailedQueryBuilder {
  private conditions: Prisma.Sql[] = []
  private innerJoins: Prisma.Sql[] = []
  private havings: Prisma.Sql[] = []
  private scores: Prisma.Sql[] = []
  private ordinations: Prisma.Sql[] = []

  public withFullNameSearch(fullName?: string): this {
    if (!fullName) return this

    const searchContent = fullName.toUpperCase()
    const unaccented = Prisma.sql`unaccent(${searchContent})`
    const tsQuery = Prisma.sql`websearch_to_tsquery('portuguese', ${unaccented})`

    this.conditions.push(
      Prisma.sql`(
        u.full_name_unaccent % ${unaccented} OR
        u.full_name_tsv_pt @@ ${tsQuery} OR
        u.full_name_unaccent ILIKE '%' || ${unaccented} || '%'
      )`,
    )

    this.scores.push(Prisma.sql`similarity(u.full_name_unaccent, ${unaccented}) * 0.75`)
    this.scores.push(Prisma.sql`ts_rank(u.full_name_tsv_pt, ${tsQuery}) * 0.25`)

    return this
  }

  public withBasicFilters(query: IBuildListAllUsersDetailedQuery): this {
    if (query.email) {
      this.conditions.push(Prisma.sql`u.email ILIKE ${`%${query.email}%`}`)
    }

    if (query.username) {
      this.conditions.push(Prisma.sql`u.username ILIKE ${`%${query.username}%`}`)
    }

    if (query.departmentName) {
      this.conditions.push(Prisma.sql`u.department_name ILIKE ${`%${query.departmentName}%`}`)
    }

    if (query.occupation) {
      this.conditions.push(Prisma.sql`u.occupation = ${query.occupation}::"OccupationType"`)
    }

    if (query.educationLevel) {
      this.conditions.push(Prisma.sql`u.education_level = ${query.educationLevel}::"EducationLevelType"`)
    }

    if (typeof query.receiveReports === 'boolean') {
      this.conditions.push(Prisma.sql`u.receive_reports = ${query.receiveReports}`)
    }

    return this
  }

  public withRolesAndStatus(roles?: string[], statuses?: string[]): this {
    if (roles?.length) {
      const rolesSql = roles.map((r) => Prisma.sql`u.role = ${r}::"UserRoleType"`)
      this.conditions.push(Prisma.sql`(${Prisma.join(rolesSql, ' OR ')})`)
    }

    if (statuses?.length) {
      const statusesSql = statuses.map((s) => Prisma.sql`u.membership_status = ${s}::"MembershipStatusType"`)
      this.conditions.push(Prisma.sql`(${Prisma.join(statusesSql, ' OR ')})`)
    }

    return this
  }

  public withKeywords(keywords?: string[]): this {
    if (!keywords?.length) return this

    const keywordsUnique = Array.from(new Set(keywords))
    const kwCount = keywordsUnique.length

    this.innerJoins.push(Prisma.sql`LEFT JOIN "_KeywordToUser" ktu ON ktu."B" = u.id`)
    this.innerJoins.push(Prisma.sql`LEFT JOIN keywords k ON k.id = ktu."A"`)
    this.havings.push(
      Prisma.sql`COUNT(DISTINCT k.value) FILTER (WHERE k.value ILIKE ANY(${keywordsUnique}::text[])) = ${kwCount}`,
    )

    return this
  }

  public withSorting(orderBy?: IBuildListAllUsersDetailedQuery['orderBy']): this {
    if (this.scores.length > 0) {
      this.ordinations.unshift(Prisma.sql`(${Prisma.join(this.scores, ' + ')}) DESC`)
    }

    if (orderBy?.createdAtOrder) {
      this.ordinations.push(Prisma.sql`u.created_at ${Prisma.raw(orderBy.createdAtOrder.toUpperCase())}`)
    }

    if (orderBy?.fullNameOrder) {
      this.ordinations.push(Prisma.sql`u.full_name_unaccent ${Prisma.raw(orderBy.fullNameOrder.toUpperCase())}`)
    }

    this.ordinations.push(Prisma.sql`u.id ASC`)

    return this
  }

  public build(limit: number, offset: number) {
    const joinClause = this.innerJoins.length > 0 ? Prisma.join(this.innerJoins, ' ') : Prisma.empty

    const whereClause =
      this.conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(this.conditions, ' AND ')}` : Prisma.empty

    const groupByClause = Prisma.sql`GROUP BY u.id`

    const havingClause =
      this.havings.length > 0 ? Prisma.sql`HAVING ${Prisma.join(this.havings, ' AND ')}` : Prisma.empty

    const orderByClause =
      this.ordinations.length > 0 ? Prisma.sql`ORDER BY ${Prisma.join(this.ordinations, ', ')}` : Prisma.empty

    // NOTE: Uso de deferred join para paginar e ordenar
    // primeiro pelos ids e so entao trazer o payload completo.
    const searchQuery = Prisma.sql`
      WITH paginated_users AS (
        SELECT u.id
        FROM users u
        ${joinClause}
        ${whereClause}
        ${groupByClause}
        ${havingClause}
        ${orderByClause}
        LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`}
      )
      SELECT
        u.id, u.public_id, u.full_name, u.profile_image, u.email,
        u.role, u.email_is_public, ast.name as state, i.name as institution_name
      FROM paginated_users pu
      JOIN users u ON u.id = pu.id
      LEFT JOIN institutions i ON i.id = u.institution_id
      LEFT JOIN addresses a ON a.user_id = u.id
      LEFT JOIN address_states ast ON a.state_id = ast.id
      ${orderByClause}
    `

    const countQuery = Prisma.sql`
      SELECT COUNT(*)::int AS total
      FROM (
        SELECT u.id FROM users u
        ${joinClause} ${whereClause} ${groupByClause} ${havingClause}
      ) AS t
    `

    return { searchQuery, countQuery }
  }
}
