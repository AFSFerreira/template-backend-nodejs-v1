import type { IBuildListAllUsersSimplifiedQuery } from '@custom-types/query/users/user-simplified'
import { MembershipStatusType, Prisma, UserRoleType } from '@prisma/client'
import { evalOffset } from '@utils/generics/eval-offset'

export function buildListAllUsersSimplifiedQuery(query: IBuildListAllUsersSimplifiedQuery) {
  const conditions: Prisma.Sql[] = [
    Prisma.sql`u.membership_status = ${MembershipStatusType.ACTIVE}::"MembershipStatusType"`,
    Prisma.sql`u.role != ${UserRoleType.ADMIN}::"UserRoleType"`,
    Prisma.sql`u.role != ${UserRoleType.MANAGER}::"UserRoleType"`,
  ]

  const scores: Prisma.Sql[] = []
  const ordinations: Prisma.Sql[] = []

  if (query.fullName) {
    const searchContent = query.fullName.toUpperCase()

    const unaccentedSearchContent = Prisma.sql`unaccent(${searchContent})`

    const tsQuery = Prisma.sql`plainto_tsquery('portuguese', ${unaccentedSearchContent})`

    conditions.push(
      Prisma.sql`(
        u.full_name_unaccent % ${unaccentedSearchContent} OR
        u.full_name_tsv_pt @@ ${tsQuery} OR
        u.full_name_unaccent ILIKE '%' || ${unaccentedSearchContent} || '%'
      )`,
    )

    scores.push(Prisma.sql`similarity(u.full_name_unaccent, ${unaccentedSearchContent}) * 0.75`)
    scores.push(Prisma.sql`ts_rank(u.full_name_tsv_pt, ${tsQuery}) * 0.25`)
  }

  if (query.institutionName) {
    conditions.push(Prisma.sql`i.name ILIKE ${query.institutionName}`)
  }

  if (query.state) {
    conditions.push(Prisma.sql`ast.name ILIKE ${query.state}`)
  }

  const whereClause = conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty

  const { limit, offset } = evalOffset(query)

  if (scores.length > 0) {
    const scoreExpression = Prisma.sql`(${Prisma.join(scores, ' + ')})`
    ordinations.unshift(Prisma.sql`${scoreExpression} DESC`)
  }

  if (query.orderBy) {
    if (query.orderBy.fullNameOrder) {
      const fullNameOrder = query.orderBy.fullNameOrder.toUpperCase()
      ordinations.push(Prisma.sql`u.full_name_unaccent ${Prisma.raw(fullNameOrder)}`)
    }
  }

  ordinations.push(Prisma.sql`u.id ASC`)

  const orderByClause = Prisma.sql`ORDER BY ${Prisma.join(ordinations, ', ')}`

  const searchQuery = Prisma.sql`
    SELECT
      u.id,
      u.public_id,
      u.full_name,
      u.email,
      u.email_is_public,
      ast.name as state,
      i.name as institution_name
    FROM users u
    LEFT JOIN institutions i ON i.id = u.institution_id
    LEFT JOIN addresses a ON a.user_id = u.id
    LEFT JOIN address_states ast ON a.state_id = ast.id
    ${whereClause}
    ${orderByClause}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`}
  `

  const countQuery = Prisma.sql`
    SELECT COUNT(*)::int AS total
    FROM users u
    LEFT JOIN institutions i ON i.id = u.institution_id
    LEFT JOIN addresses a ON a.user_id = u.id
    LEFT JOIN address_states ast ON a.state_id = ast.id
    ${whereClause}
  `

  return { searchQuery, countQuery }
}
