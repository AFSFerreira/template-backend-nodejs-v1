import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  BlogDetailedForAdminPresenterInput,
  HTTPBlogDetailedForAdmin,
} from '@custom-types/http/presenter/blog/blog-detailed-for-admin'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'

export class BlogDetailedForAdminPresenter
  implements IPresenterStrategy<BlogDetailedForAdminPresenterInput, HTTPBlogDetailedForAdmin>
{
  public toHTTP(input: BlogDetailedForAdminPresenterInput): HTTPBlogDetailedForAdmin {
    return {
      id: input.publicId,
      editorialStatus: input.editorialStatus,
      title: input.title,
      accessCount: input.accessCount,
      bannerImage: buildBlogBannerUrl(input.bannerImage),
      authorName: input.User?.fullName ?? input.authorName,
      subcategories: input.Subcategories?.map((sc) => sc.area) ?? [],
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
