import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPBlogDetailedWithContent } from '@custom-types/presenter/blog/blog-detailed-with-content'
import type { BlogWithDetails } from '@custom-types/validator/blog-with-details'
import { BLOG_DETAILED_WITH_CONTENT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildBlogBannerUrl } from '@services/http/url/build-blog-banner-url'

@RegisterPresenter(BLOG_DETAILED_WITH_CONTENT_PRESENTER_KEY)
export class BlogDetailedWithContentPresenter
  implements IPresenterStrategy<BlogWithDetails, HTTPBlogDetailedWithContent>
{
  public toHTTP(input: BlogWithDetails): HTTPBlogDetailedWithContent {
    const {
      id,
      publicId,
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
      content: input.content,
    }
  }
}
