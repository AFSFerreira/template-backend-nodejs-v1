import type { IBuildListAllUsersSimplifiedQuery } from '@custom-types/repository/prisma/query/users/user-simplified'
import { evalOffset } from '@utils/generics/eval-offset'
import { ListUsersSimplifiedQueryBuilder } from '../bulders/list-users-simplified-query-builder'

export function buildListAllUsersSimplifiedQuery(query: IBuildListAllUsersSimplifiedQuery) {
  const { limit, offset } = evalOffset(query)

  const builder = new ListUsersSimplifiedQueryBuilder()
    .withFullNameSearch(query.fullName)
    .withInstitution(query.institutionName)
    .withState(query.state)
    .withSorting(query.orderBy)

  return builder.build(limit, offset)
}
