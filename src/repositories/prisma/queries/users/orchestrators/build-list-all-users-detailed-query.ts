import type { IBuildListAllUsersDetailedQuery } from '@custom-types/repository/prisma/query/users/user-detailed'
import { evalOffset } from '@utils/generics/eval-offset'
import { ListUsersDetailedQueryBuilder } from '../bulders/list-users-detailed-query-builder'

export function buildListAllUsersDetailedQuery(query: IBuildListAllUsersDetailedQuery) {
  const { limit, offset } = evalOffset(query)

  const builder = new ListUsersDetailedQueryBuilder()
    .withBasicFilters(query)
    .withFullNameSearch(query.fullName)
    .withRolesAndStatus(query.role, query.membershipStatus)
    .withKeywords(query.keywords)
    .withSorting(query.orderBy)

  return builder.build(limit, offset)
}
