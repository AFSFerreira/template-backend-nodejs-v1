import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { BlogWithDetails } from '@custom-types/presenter/blog/blog-detailed'
import type { HTTPBlogDetailedForAdmin } from '@custom-types/presenter/blog/blog-detailed-for-admin'
import { BLOG_DETAILED_FOR_ADMIN } from '@constants/presenters-constants'
import { STATIC_BLOG_BANNERS_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import urlJoin from 'url-join'

@RegisterPresenter(BLOG_DETAILED_FOR_ADMIN)
export class BlogDetailedForAdminPresenter implements IPresenterStrategy<BlogWithDetails, HTTPBlogDetailedForAdmin> {
  public toHTTP(input: BlogWithDetails): HTTPBlogDetailedForAdmin {
    const backendBaseUrl = getBackendBaseUrl()

    return {
      id: input.publicId,
      editorialStatus: input.editorialStatus,
      title: input.title,
      accessCount: input.accessCount,
      bannerImage: urlJoin(backendBaseUrl, STATIC_BLOG_BANNERS_IMAGE_ROUTE, input.bannerImage),
      authorName: input.User?.fullName ?? input.authorName,
      subCategories: input.Subcategories?.map((sc) => sc.area) ?? [],
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
