import type { IBuildListAllUsersSimplifiedQuery } from '@custom-types/repository/prisma/query/users/user-simplified'
import { MembershipStatusType, Prisma, UserRoleType } from '@prisma/generated/client'

export class ListUsersSimplifiedQueryBuilder {
  private conditions: Prisma.Sql[] = []
  private innerJoins: Prisma.Sql[] = []
  private scores: Prisma.Sql[] = []
  private ordinations: Prisma.Sql[] = []

  constructor() {
    this.conditions.push(Prisma.sql`u.membership_status = ${MembershipStatusType.ACTIVE}::"MembershipStatusType"`)
    this.conditions.push(Prisma.sql`u.role != ${UserRoleType.ADMIN}::"UserRoleType"`)
    this.conditions.push(Prisma.sql`u.role != ${UserRoleType.MANAGER}::"UserRoleType"`)
  }

  public withTextSearch(fullName?: string): this {
    if (!fullName) return this

    const searchContent = fullName.toUpperCase()
    const unaccentedSearchContent = Prisma.sql`unaccent(${searchContent})`
    const tsQuery = Prisma.sql`websearch_to_tsquery('portuguese', ${unaccentedSearchContent})`

    this.conditions.push(
      Prisma.sql`(
        u.full_name_unaccent % ${unaccentedSearchContent} OR
        u.full_name_tsv_pt @@ ${tsQuery} OR
        u.full_name_unaccent ILIKE '%' || ${unaccentedSearchContent} || '%'
      )`,
    )

    this.scores.push(Prisma.sql`similarity(u.full_name_unaccent, ${unaccentedSearchContent}) * 0.75`)
    this.scores.push(Prisma.sql`ts_rank(u.full_name_tsv_pt, ${tsQuery}) * 0.25`)

    return this
  }

  public withInstitution(institutionName?: string): this {
    if (!institutionName) return this

    this.innerJoins.push(Prisma.sql`LEFT JOIN institutions i ON i.id = u.institution_id`)
    this.conditions.push(Prisma.sql`i.name ILIKE ${institutionName}`)

    return this
  }

  public withState(state?: string): this {
    if (!state) return this

    this.innerJoins.push(Prisma.sql`LEFT JOIN addresses a ON a.user_id = u.id`)
    this.innerJoins.push(Prisma.sql`LEFT JOIN address_states ast ON a.state_id = ast.id`)
    this.conditions.push(Prisma.sql`ast.name ILIKE ${state}`)

    return this
  }

  public withSorting(orderBy?: IBuildListAllUsersSimplifiedQuery['orderBy']): this {
    if (this.scores.length > 0) {
      const scoreExpression = Prisma.sql`(${Prisma.join(this.scores, ' + ')})`
      this.ordinations.unshift(Prisma.sql`${scoreExpression} DESC`)
    }

    if (orderBy?.fullNameOrder) {
      const fullNameOrder = orderBy.fullNameOrder.toUpperCase()
      this.ordinations.push(Prisma.sql`u.full_name_unaccent ${Prisma.raw(fullNameOrder)}`)
    }

    this.ordinations.push(Prisma.sql`u.id ASC`)

    return this
  }

  public build(limit: number, offset: number) {
    const joinClause = this.innerJoins.length > 0 ? Prisma.join(this.innerJoins, ' ') : Prisma.empty
    const whereClause =
      this.conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(this.conditions, ' AND ')}` : Prisma.empty
    const orderByClause = Prisma.sql`ORDER BY ${Prisma.join(this.ordinations, ', ')}`

    const searchQuery = Prisma.sql`
      WITH paginated_users AS (
        SELECT u.id
        FROM users u
        ${joinClause}
        ${whereClause}
        ${orderByClause}
        LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`}
      )
      SELECT
        u.id,
        u.public_id,
        u.full_name,
        u.email,
        u.role,
        u.email_is_public,
        u.profile_image,
        ast.name as state,
        i.name as institution_name
      FROM paginated_users pu
      JOIN users u ON u.id = pu.id
      LEFT JOIN institutions i ON i.id = u.institution_id
      LEFT JOIN addresses a ON a.user_id = u.id
      LEFT JOIN address_states ast ON a.state_id = ast.id
      ${orderByClause}
    `

    const countQuery = Prisma.sql`
      SELECT COUNT(DISTINCT u.id)::int AS total
      FROM users u
      ${joinClause}
      ${whereClause}
    `

    return { searchQuery, countQuery }
  }
}
