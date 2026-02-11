import type { IBuildGetAllBlogsDetailedQuerySchemaType } from '@custom-types/repository/prisma/query/blogs/blog-detailed'
import { evalOffset } from '@utils/generics/eval-offset'
import { ListBlogsDetailedQueryBuilder } from '../bulders/list-blogs-detailed-query-builder'

export function buildListAllBlogsDetailedQuery(query: IBuildGetAllBlogsDetailedQuerySchemaType) {
  const { limit, offset } = evalOffset(query)

  const builder = new ListBlogsDetailedQueryBuilder()
    .withTextSearch(query.searchContent)
    .withAuthor(query.authorId)
    .withEditorialStatus(query.editorialStatus)
    .withSubCategories(query.subCategories)
    .withSorting(query.orderBy)

  return builder.build(limit, offset)
}
