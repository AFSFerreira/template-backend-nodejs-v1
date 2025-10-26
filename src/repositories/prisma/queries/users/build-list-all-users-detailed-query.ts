import { ActivityAreaType, Prisma } from '@prisma/client'
import type { getAllUsersDetailedQuerySchemaType as GetAllUsersDetailedQuerySchemaType } from '@schemas/user/get-all-users-detailed-query-schema'
import { evalOffset } from '@utils/eval-offset'
import { mapComparisonOperation } from '@utils/map-comparison-operation'

export function buildListAllUsersDetailedQuery(query: GetAllUsersDetailedQuerySchemaType) {
  const conditions: Prisma.Sql[] = []
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

  if (query.email) {
    conditions.push(Prisma.sql`u.email ILIKE ${`%${query.email}%`}`)
  }

  if (query.username) {
    conditions.push(Prisma.sql`u.username ILIKE ${`%${query.username}%`}`)
  }

  if (query.departmentName) {
    conditions.push(Prisma.sql`u.department_name ILIKE ${`%${query.departmentName}%`}`)
  }

  if (query.role) {
    conditions.push(Prisma.sql`u.role = ${query.role}::"UserRoleType"`)
  }

  if (query.occupation) {
    conditions.push(Prisma.sql`u.occupation = ${query.occupation}::"OccupationType"`)
  }

  if (query.educationLevel) {
    conditions.push(Prisma.sql`u.education_level = ${query.educationLevel}::"EducationLevelType"`)
  }

  if (typeof query.receiveReports === 'boolean') {
    conditions.push(Prisma.sql`u.receive_reports = ${query.receiveReports}`)
  }

  if (Array.isArray(query.membershipStatus) && query.membershipStatus.length > 0) {
    const statusesSql = query.membershipStatus.map(
      (status) => Prisma.sql`u.membership_status = ${status}::"MembershipStatusType"`,
    )
    conditions.push(Prisma.sql`(${Prisma.join(statusesSql, ' OR ')})`)
  }

  if (query.institutionName) {
    conditions.push(Prisma.sql`i.name ILIKE ${query.institutionName}`)
  }

  if (query.state) {
    conditions.push(Prisma.sql`a.state ILIKE ${query.state}`)
  }

  if (query.mainActivityArea) {
    conditions.push(
      Prisma.sql`aa_main.area ILIKE ${query.mainActivityArea} AND aa_main.type = ${ActivityAreaType.AREA_OF_ACTIVITY}::"ActivityAreaType"`,
    )
  }

  if (query.subActivityArea) {
    conditions.push(
      Prisma.sql`aa_sub.area ILIKE ${query.subActivityArea} AND aa_sub.type = ${ActivityAreaType.SUB_AREA_OF_ACTIVITY}::"ActivityAreaType"`,
    )
  }

  if (query.birthdate) {
    const op = mapComparisonOperation(query.birthdate.birthdateComparison)
    const val = query.birthdate.date
    conditions.push(Prisma.sql`u.birthdate::date ${Prisma.raw(op)} ${val}::date`)
  }

  if (query.astrobiologyOrRelatedStartYear) {
    const op = mapComparisonOperation(query.astrobiologyOrRelatedStartYear.astrobiologyOrRelatedStartYearComparison)
    const val = query.astrobiologyOrRelatedStartYear.year
    conditions.push(Prisma.sql`u.astrobiology_or_related_start_year ${Prisma.raw(op)} ${val}::int`)
  }

  const { limit, offset } = evalOffset(query)
  const whereClause = conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty

  if (scores.length > 0) {
    const scoreExpression = Prisma.sql`(${Prisma.join(scores, ' + ')})`
    ordinations.unshift(Prisma.sql`${scoreExpression} DESC`)
  }

  if (query.orderBy) {
    if (query.orderBy.createdAtOrder) {
      const createdAtOrder = query.orderBy.createdAtOrder.toUpperCase()
      ordinations.push(Prisma.sql`u.created_at ${Prisma.raw(createdAtOrder)}`)
    }

    if (query.orderBy.fullNameOrder) {
      const fullNameOrder = query.orderBy.fullNameOrder.toUpperCase()
      ordinations.push(Prisma.sql`u.full_name_unaccent ${Prisma.raw(fullNameOrder)}`)
    }
  }

  ordinations.push(Prisma.sql`u.id ASC`)

  const orderByClause = ordinations.length > 0 ? Prisma.sql`ORDER BY ${Prisma.join(ordinations, ', ')}` : Prisma.empty

  const keywords = query.keywords ?? []
  const keywordsUnique = Array.from(new Set(keywords))
  const kwCount = keywordsUnique.length

  const havingClause =
    kwCount > 0
      ? Prisma.sql`HAVING COUNT(DISTINCT k.value) FILTER (WHERE k.value ILIKE ANY(${keywordsUnique}::text[])) = ${kwCount}`
      : Prisma.empty

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
    LEFT JOIN area_of_activity aa_main ON aa_main.id = u.activity_area_id
    LEFT JOIN area_of_activity aa_sub ON aa_sub.id = u.sub_activity_area_id
    LEFT JOIN "_KeywordToUser" ktu ON ktu."B" = u.id
    LEFT JOIN keywords k ON k.id = ktu."A"
    ${whereClause}
    GROUP BY u.id, i.id, a.id, aa_main.id, aa_sub.id
    ${havingClause}
    ${orderByClause}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`}
  `

  const countQuery = Prisma.sql`
    SELECT COUNT(*)::int AS total FROM (
      SELECT u.id
      FROM users u
      LEFT JOIN institutions i ON i.id = u.institution_id
      LEFT JOIN addresses a ON a.user_id = u.id
      LEFT JOIN area_of_activity aa_main ON aa_main.id = u.activity_area_id
      LEFT JOIN area_of_activity aa_sub ON aa_sub.id = u.sub_activity_area_id
      LEFT JOIN "_KeywordToUser" ktu ON ktu."B" = u.id
      LEFT JOIN keywords k ON k.id = ktu."A"
      ${whereClause}
      GROUP BY u.id, i.id, a.id, aa_main.id, aa_sub.id
      ${havingClause}
    ) AS t;
  `

  return { searchQuery, countQuery }
}
