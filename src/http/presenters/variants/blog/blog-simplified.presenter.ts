import type { CustomBlogWithSimplifiedDetails } from '@custom-types/adapter/blog-simplified'
import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSimplifiedBlog } from '@custom-types/presenter/blog/blog-simplified'
import { BLOG_SIMPLIFIED_PRESENTER_KEY } from '@constants/presenters-constants'
import { STATIC_BLOG_BANNERS_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import urlJoin from 'url-join'

@RegisterPresenter(BLOG_SIMPLIFIED_PRESENTER_KEY)
export class BlogSimplifiedPresenter implements IPresenterStrategy<
  CustomBlogWithSimplifiedDetails,
  HTTPSimplifiedBlog
> {
  public toHTTP(input: CustomBlogWithSimplifiedDetails): HTTPSimplifiedBlog {
    const backendBaseUrl = getBackendBaseUrl()

    return {
      id: input.publicId,
      title: input.title,
      editorialStatus: input.editorialStatus,
      bannerImage: urlJoin(backendBaseUrl, STATIC_BLOG_BANNERS_IMAGE_ROUTE, input.bannerImage),
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
