import { MembershipStatusType, Prisma, UserRoleType } from '@prisma/client'
import type { GetAllUsersSimplifiedQuerySchemaType } from '@schemas/user/get-all-users-simplified-query-schema'
import { evalOffset } from '@utils/eval-offset'

export function buildListAllUsersSimplifiedQuery(query: GetAllUsersSimplifiedQuerySchemaType) {
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
        u.full_name_unaccent ILIKE unaccent(${`%${searchContent}%`}) OR
        u.full_name_tsv_pt @@ ${tsQuery}
      )`,
    )

    scores.push(Prisma.sql`similarity(u.full_name_unaccent, ${unaccentedSearchContent}) * 0.75`)
    scores.push(Prisma.sql`ts_rank(u.full_name_tsv_pt, ${tsQuery}) * 0.25`)
  }

  if (query.institutionName) {
    conditions.push(Prisma.sql`i.name ILIKE ${query.institutionName}`)
  }

  if (query.state) {
    conditions.push(Prisma.sql`a.state ILIKE ${query.state}`)
  }

  const whereClause = conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty

  const { limit, offset } = evalOffset(query)

  const scoreExpression = scores.length > 0 ? Prisma.sql`(${Prisma.join(scores, ' + ')})` : Prisma.sql`0`

  if (query.orderBy.fullNameOrder) {
    ordinations.push(Prisma.sql`u.full_name_unaccent ASC`)
  }

  if (scores.length > 0) {
    ordinations.push(Prisma.sql`${scoreExpression} DESC`)
  }

  ordinations.push(Prisma.sql`u.public_id ASC`)

  const orderByClause = Prisma.sql`ORDER BY ${Prisma.join(ordinations, ', ')}`

  const searchQuery = Prisma.sql`
    SELECT
      u.id,
      u.public_id,
      u.full_name,
      u.email,
      u.email_is_public,
      a.state,
      i.name as institution_name
    FROM users u
    LEFT JOIN institutions i ON i.id = u.institution_id
    LEFT JOIN addresses a ON a.user_id = u.id
    ${whereClause}
    ${orderByClause}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`}
  `

  const countQuery = Prisma.sql`
    SELECT COUNT(*)::int AS total
    FROM users u
    LEFT JOIN institutions i ON i.id = u.institution_id
    LEFT JOIN addresses a ON a.user_id = u.id
    ${whereClause}
  `

  return { searchQuery, countQuery }
}
