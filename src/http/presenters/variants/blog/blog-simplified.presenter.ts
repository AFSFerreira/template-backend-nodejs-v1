import type { CustomBlogWithSimplifiedDetails } from '@custom-types/adapter/blog-simplified'
import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSimplifiedBlog } from '@custom-types/presenter/blog/blog-simplified'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'

@RegisterPresenter(tokens.presenters.blogSimplified)
export class BlogSimplifiedPresenter
  implements IPresenterStrategy<CustomBlogWithSimplifiedDetails, HTTPSimplifiedBlog>
{
  public toHTTP(input: CustomBlogWithSimplifiedDetails): HTTPSimplifiedBlog {
    return {
      id: input.publicId,
      title: input.title,
      editorialStatus: input.editorialStatus,
      bannerImage: buildBlogBannerUrl(input.bannerImage),
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
