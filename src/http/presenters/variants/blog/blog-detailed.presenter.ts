import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { BlogWithDetails, HTTPBlogDetailed } from '@custom-types/presenter/blog/blog-detailed'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'

@RegisterPresenter(tokens.presenters.blogDetailed)
export class BlogDetailedPresenter implements IPresenterStrategy<BlogWithDetails, HTTPBlogDetailed> {
  public toHTTP(input: BlogWithDetails): HTTPBlogDetailed {
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
      bannerImage: buildBlogBannerUrl(input.bannerImage),
      authorName: input.User?.fullName ?? input.authorName,
      subCategories: input.Subcategories?.map((sc) => sc.area) ?? [],
    }
  }
}
