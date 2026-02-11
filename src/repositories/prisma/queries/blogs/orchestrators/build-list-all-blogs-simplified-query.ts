import type { IBuildListAllUserBlogsDetailedQuery } from '@custom-types/repository/prisma/query/blogs/blog-simplified'
import { evalOffset } from '@utils/generics/eval-offset'
import { ListBlogsSimplifiedQueryBuilder } from '../bulders/list-blogs-simplified-query-builder'

export function buildListAllBlogsSimplifiedQuery(query: IBuildListAllUserBlogsDetailedQuery) {
  const { limit, offset } = evalOffset(query)

  const builder = new ListBlogsSimplifiedQueryBuilder()
    .withTextSearch(query.searchContent)
    .withAuthor(query.authorId)
    .withSubCategories(query.subCategories)
    .withSorting(query.orderBy)

  return builder.build(limit, offset)
}
