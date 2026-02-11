import type { IBuildGetAllUserBlogsDetailedQuerySchemaType } from '@custom-types/repository/prisma/query/blogs/user-blog-detailed'
import { evalOffset } from '@utils/generics/eval-offset'
import { ListUserBlogsDetailedQueryBuilder } from '../bulders/list-user-blogs-detailed-query-builder'

export function buildListAllUserBlogsDetailedQuery(query: IBuildGetAllUserBlogsDetailedQuerySchemaType) {
  const { limit, offset } = evalOffset(query)

  const builder = new ListUserBlogsDetailedQueryBuilder()
    .withUserId(query.userId)
    .withTextSearch(query.searchContent)
    .withAuthor(query.authorId)
    .withEditorialStatus(query.editorialStatus)
    .withSubCategories(query.subCategories)
    .withSorting(query.orderBy)

  return builder.build(limit, offset)
}
