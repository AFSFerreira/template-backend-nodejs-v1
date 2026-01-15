import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSimplifiedBlog } from '@custom-types/http/presenter/blog/blog-simplified'
import type { CustomBlogWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/blog-simplified'

export class BlogSimplifiedPresenter
  implements IPresenterStrategy<CustomBlogWithSimplifiedDetails, HTTPSimplifiedBlog>
{
  public toHTTP(input: CustomBlogWithSimplifiedDetails): HTTPSimplifiedBlog {
    return {
      id: input.publicId,
      title: input.title,
      editorialStatus: input.editorialStatus,
      bannerImage: input.bannerImage,
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
