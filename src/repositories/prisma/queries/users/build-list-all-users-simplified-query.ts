import { MembershipStatusType, Prisma } from '@prisma/client'
import type { GetAllUsersSimplifiedQuerySchemaType } from '@schemas/user/get-all-users-simplified-query-schema'

export function buildListAllUsersSimplifiedQuery(query: GetAllUsersSimplifiedQuerySchemaType) {
  const conditions: Prisma.Sql[] = [
    Prisma.sql`u.membership_status = ${MembershipStatusType.ACTIVE}::"MembershipStatusType"`,
  ]

  if (query.fullName) {
    conditions.push(
      Prisma.sql`(
        u.full_name % ${query.fullName} OR
        u.full_name ILIKE ${`%${query.fullName}%`}
      )`,
    )
  }

  if (query.institutionName) {
    conditions.push(Prisma.sql`i.name = ${query.institutionName}`)
  }

  if (query.state) {
    conditions.push(Prisma.sql`a.state = ${query.state}`)
  }

  const whereClause = conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty

  const limit = query.limit ?? 20
  const page = query.page ?? 1
  const offset = (page - 1) * limit

  const searchQuery = Prisma.sql`
    SELECT
      u.id,
      u.public_id,
      u.full_name,
      u.username,
      i.name AS institution_name,
      a.state AS state,
      u.email_is_public,
      u.email
    FROM users u
    LEFT JOIN institutions i ON i.id = u.institution_id
    LEFT JOIN addresses a ON a.user_id = u.id
    ${whereClause}
    ORDER BY u.created_at DESC
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
