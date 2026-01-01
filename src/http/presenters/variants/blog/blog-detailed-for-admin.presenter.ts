import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { BlogWithDetails } from '@custom-types/presenter/blog/blog-detailed'
import type {
  HTTPBlogDetailedForAdmin,
  IBlogDetailedForAdmin,
} from '@custom-types/presenter/blog/blog-detailed-for-admin'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'

@RegisterPresenter(tokens.presenters.blogDetailedForAdmin)
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
