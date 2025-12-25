import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { BlogWithDetails, HTTPBlogDetailed } from '@custom-types/presenter/blog/blog-detailed'
import { BLOG_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { STATIC_BLOG_BANNERS_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import urlJoin from 'url-join'

@RegisterPresenter(BLOG_DETAILED_PRESENTER_KEY)
export class BlogDetailedPresenter implements IPresenterStrategy<BlogWithDetails, HTTPBlogDetailed> {
  public toHTTP(input: BlogWithDetails): HTTPBlogDetailed {
    const backendBaseUrl = getBackendBaseUrl()

    const {
      id,
      publicId,
      content,
      titleUnaccent,
      userId,
      searchContent,
      Subcategories,
      User,
      editorialStatus,
      ...filteredBlog
    } = input

    return {
      ...filteredBlog,
      id: input.publicId,
      editorialStatus: input.editorialStatus,
      bannerImage: urlJoin(backendBaseUrl, STATIC_BLOG_BANNERS_IMAGE_ROUTE, input.bannerImage),
      authorName: input.User?.fullName ?? input.authorName,
      subCategories: input.Subcategories?.map((sc) => sc.area) ?? [],
    }
  }
}
