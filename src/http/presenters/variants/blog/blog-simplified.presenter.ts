import type { CustomBlogWithSimplifiedDetails } from '@custom-types/adapter/blog-simplified'
import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSimplifiedBlog } from '@custom-types/presenter/blog/blog-simplified'
import { BLOG_SIMPLIFIED_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(BLOG_SIMPLIFIED_PRESENTER_KEY)
export class BlogSimplifiedPresenter
  implements IPresenterStrategy<CustomBlogWithSimplifiedDetails, HTTPSimplifiedBlog>
{
  public toHTTP(input: CustomBlogWithSimplifiedDetails): HTTPSimplifiedBlog {
    return {
      id: input.publicId,
      title: input.title,
      bannerImage: input.bannerImage,
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
