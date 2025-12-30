import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { BlogWithDetails } from '@custom-types/presenter/blog/blog-detailed'
import type {
  HTTPBlogDetailedForAdmin,
  IBlogDetailedForAdmin,
} from '@custom-types/presenter/blog/blog-detailed-for-admin'
import { BLOG_DETAILED_FOR_ADMIN } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'

@RegisterPresenter(BLOG_DETAILED_FOR_ADMIN)
export class BlogDetailedForAdminPresenter implements IPresenterStrategy<BlogWithDetails, HTTPBlogDetailedForAdmin> {
  public toHTTP(input: IBlogDetailedForAdmin): HTTPBlogDetailedForAdmin {
    return {
      id: input.publicId,
      editorialStatus: input.editorialStatus,
      title: input.title,
      accessCount: input.accessCount,
      bannerImage: buildBlogBannerUrl(input.bannerImage),
      authorName: input.User?.fullName ?? input.authorName,
      subCategories: input.Subcategories?.map((sc) => sc.area) ?? [],
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
